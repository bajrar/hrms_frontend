import { useState } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, DatePicker,Select } from 'antd';
import { toast } from 'react-toastify';

import { apis } from '../apis/constants/ApisService';
import './add-employee-form.css';
import BreadCrumbs from '../Ui/BreadCrumbs/BreadCrumbs';
import Layout from '../Layout';
import Navbar from '../Ui/Navbar';
import ViewEmployee from '../ViewEmployee';

const Employee = () => {
  const [gender, setGender] = useState('');

  const onFinish = async (values: any) => {
    try {
      const res = await apis.addEmployee(values);

      if (res.status === 201) {
        toast.success('Employee Submitted Sucesfully', {
          position: 'top-center',
          autoClose: 5000,
        });
        window.location.reload();
      }
    } catch {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const firstRow = [
    {
      name: 'employeeNumber',
      label: 'Employee Number',
      message: 'Employee Number is Required',
      placeHolder: 'EX: 6854654163',
      type: 'number',
    },
    {
      name: 'employeeName',
      label: 'Employee Name',
      message: 'Employee Name is Required',
      placeHolder: 'John Doe',
      type: 'text',
    },
  ];
  const thirdRow = [
    {
      name: 'email',
      label: 'Email',
      message: 'Email Required',
      placeHolder: 'johndoe@gmail.com',
      type: 'email',
    },
    {
      name: 'mobileNumber',
      label: 'Mobile Number',
      message: 'Mobile Number is Required',
      placeHolder: 'EX: 6854654163',
      type: 'number',
    },
  ];
  const fourthRow = [
    {
      name: 'reportingManager',
      label: 'Reporting Manager',
      message: 'Reporting Manager Required',
      type: 'text',
    },
    // {
    //   name: 'status',
    //   label: 'Status',
    //   message: 'Status Required',
    //   type: 'text',
    // },
  ];
  const emergencyContact = [
    {
      name: 'emergencyName',
      label: 'Emergency Contact Name',
      message: 'Emergency Contact Name Required',
      placeHolder: 'EX: John Doe',
      type: 'text',
    },
    {
      name: 'emergencyContact',
      label: 'Emergency Contact Number',
      message: 'Emergency Contact Number Required',
      placeHolder: 'EX: 2541210',
      type: 'number',
    },
    {
      name: 'parentName',
      label: "Father's/Mother's Name",
      message: "Father's/ Mother's Name Required",
      placeHolder: 'John Doe',
      type: 'text',
    },
    {
      name: 'spouseName',
      label: 'Spouse Name',
      message: 'Spouse Name Required',
      placeHolder: 'John Doe',
      type: 'text',
    },
  ];

  return (
    <>
    {false?
    <Layout>
      <Navbar />
      <div className='mb-4'>
        <div style={{ marginTop: 30, paddingInline: 32 }}>
          <div style={{ paddingInline: -32 }}>
            <BreadCrumbs
              imagesrc='/images/employee.svg'
              location='Employee Management'
              location1='Add Employee'
            />
            <hr />
          </div>
          <Form layout='vertical' onFinish={onFinish} autoComplete='off'>
            <div className='row p-0'>
              <h3 className='add-employee__section-header'>
                Basic Information
              </h3>
              <hr />
              <div className='add-employee__section p-0'>
                {firstRow.map((item) => (
                  <Form.Item
                    className='form-input col'
                    name={item.name}
                    label={item.label}
                    rules={[{ required: true, message: item.message }]}
                  >
                    <Input
                      name={item.name}
                      placeholder={item.placeHolder}
                      className='form-input-wrapper'
                      type={item.type}
                    />
                  </Form.Item>
                ))}
              </div>
            </div>
            <div className='row add-employee__section'>
              <Form.Item
                label='Date of Birth'
                className='form-input  form-input-container'
                name='dob'
              >
                <DatePicker
                  placeholder='dd/mm/yyyy'
                  className='form-input-contain'
                  suffixIcon={
                    <div className='calendar-container'>
                      <img src='./images/calendar.svg' alt='calendar' />
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                label='Gender'
                className='form-input  form-input-container'
                name='gender'
              >
                <Radio.Group onChange={onChangeRadio} value={gender}>
                  <Radio value={'male'}>Male</Radio>
                  <Radio value={'female'}>Female</Radio>
                  <Radio value={'other'}>Other</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className='row p-0'>
              <h3 className='add-employee__section-header'> Office Details</h3>
              <hr />
              <div className='add-employee__section p-0'>
                {thirdRow.map((item) => (
                  <Form.Item
                    className='form-input col'
                    name={item.name}
                    label={item.label}
                    rules={[{ required: true, message: item.message }]}
                  >
                    <Input
                      name={item.name}
                      placeholder={item.placeHolder}
                      className='form-input-wrapper'
                      type={item.type}
                    />
                  </Form.Item>
                ))}
                <Form.Item
                  label='Date of Joining'
                  className='form-input col'
                  name='dateOfJoining'
                >
                  <DatePicker
                    placeholder='dd/mm/yyyy'
                    className='form-input-contain'
                    suffixIcon={
                      <div className='calendar-container'>
                        <img src='./images/calendar.svg' />
                      </div>
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className='row add-employee__section p-0'>
              {fourthRow.map((item) => (
                <Form.Item
                  className='form-input form-input-container-fourth'
                  name={item.name}
                  label={item.label}
                  rules={[{ required: true, message: item.message }]}
                >
                  <Input
                    name={item.name}
                    className='form-input-wrapper form-input-wrapper'
                    type={item.type}
                  />
                </Form.Item>
              ))}
              <Form.Item
                label='Status'
                className='form-input  form-input-container-fourth'
                name='status'
              >
      <Select
    showSearch
    placeholder="Search to Status"
    style={{
      marginTop: "20px",
      gap: "30px"
    }}
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
 
    options={[
      {
        value: 'working',
        label: 'Working',
      },
      {
        value: 'resigned',
        label: 'Resigned',
      },
      {
        value: 'pending',
        label: 'Pending',
      },
      {
        value: 'Onsite',
        label: 'Onsite',
      },
  
    ]}
  />
              </Form.Item>
              <Form.Item
                label='Designation'
                className='form-input  form-input-container-fourth'
                name='designation'
              >
                <Input
                  name='designation'
                  placeholder='Designation'
                  className='form-input-wrapper'
                  type='text'
                />
              </Form.Item>
              <Form.Item
                label='Project Team'
                className='form-input  form-input-container-fourth'
                name='projectTeam'
              >
                <Input
                  name='projectTeam'
                  placeholder='Project Team'
                  className='form-input-wrapper'
                  type='text'
                />
              </Form.Item>
            </div>

            <div className='row p-0'>
              <h3 className='add-employee__section-header'>
                Emergency Contact Details
              </h3>
              <hr />
              {emergencyContact.map((item) => (
                <div className='col-4'>
                  <Form.Item
                    className='form-input col'
                    name={item.name}
                    label={item.label}
                    rules={[{ required: false }]}
                  >
                    <Input
                      name={item.name}
                      placeholder={item.placeHolder}
                      className='form-input-wrapper'
                      type={item.type}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>

            <div className='form-footer'>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>: <ViewEmployee/>
    }
    </>
  );
};

export default Employee;
