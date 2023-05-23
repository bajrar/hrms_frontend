import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  DatePicker,
  Select,
} from 'antd';
import { toast } from 'react-toastify';

import { apis, axiosApiInstance } from '../apis/constants/ApisService';
import './add-employee-form.css';
import BreadCrumbs from '../Ui/BreadCrumbs/BreadCrumbs';
import Layout from '../Layout';
import Navbar from '../Ui/Navbar';
import Selects from '../Ui/Selects/Selects';
import { WorkingCondition } from '../../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../Ui/Modal/Modal';
import ViewAllEmployee from '../Ui/Tables/ViewAllEmployee';
import { isErrored } from 'stream';

const EmployeeForm =  ({setIsModalOpen,update,employeeId}:any) => {
  const [gender, setGender] = useState('');
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [employeeData, setEmployeeData] = useState({} as any);
  console.log({employeeId})

  const getSingleEmployeeData = async (employeeId:any) => {
    try {
      const data = await apis.getSingleEmployee(employeeId);
      return data
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const data = await getSingleEmployeeData(employeeId);
      setEmployeeData(data?.data?.employee);
    };
    fetchEmployeeData();
  }, [employeeId]);
  console.log({ employeeData });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [UpdateisModalOpen, setUpdateIsModalOpen] = useState(false);
//   const [getEmployeeData,setGetEmployeeData] = useState({}as any)

  const [form] = Form.useForm();
  const onSelect = (e: any) => {
    setStatus(e);
  };
//   console.log({update})
//   const showModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };
  console.log({update})
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

  const onUpdateEmployee = async (values: any) => {
    try {
      const res = await apis.updateEmployee(values,employeeId);
      if (res.status === 201) {
        form.resetFields();
      }
    } catch {
    } finally {
      setIsModalOpen(false);
    }
  };


  const onChangeRadio = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
//   const getData = (data:any,isOpen:Boolean)=>{
//     setGetEmployeeData(data)
//   }
  const firstRow = [
    {
      name: 'employeeNumber',
      label: 'Employee Number',
      message: 'Employee Number is Required',
      placeHolder: 'EX: 6854654163',
      type: 'number',
      initialValue:update?employeeData?.employeeNumber:'',
      
    },
    {
      name: 'employeeName',
      label: 'Employee Name',
      message: 'Employee Name is Required',
      placeHolder: 'John Doe',
      type: 'text',
      initialValue:employeeData?.employeeName,

      
    },
  ];
  const thirdRow = [
    {
      name: 'email',
      label: 'Email',
      message: 'Email Required',
      placeHolder: 'johndoe@gmail.com',
      type: 'email',
      initialValue: employeeData?.email
      
    },
    {
      name: 'mobileNumber',
      label: 'Mobile Number',
      message: 'Mobile Number is Required',
      placeHolder: 'EX: 6854654163',
      type: 'number',
      initialValue: employeeData?.mobileNumber

    },
  ];
  const fourthRow = [
    {
      name: 'reportingManager',
      label: 'Reporting Manager',
      message: 'Reporting Manager Required',
      type: 'text',
      initialValue: employeeData?.reportingManager

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
      initialValue: employeeData?.email

    },
    {
      name: 'emergencyContact',
      label: 'Emergency Contact Number',
      message: 'Emergency Contact Number Required',
      placeHolder: 'EX: 2541210',
      type: 'number',
      initialValue: employeeData?.email

    },
    {
      name: 'parentName',
      label: "Father's/Mother's Name",
      message: "Father's/ Mother's Name Required",
      placeHolder: 'John Doe',
      type: 'text',
      initialValue: employeeData?.email

    },
    {
      name: 'spouseName',
      label: 'Spouse Name',
      message: 'Spouse Name Required',
      placeHolder: 'John Doe',
      type: 'text',
      initialValue: employeeData?.email

    },
  ];

  const WorkingCondition = [
    {
      label: 'All Status',
      value: '',
    },
    {
      label: 'Working',
      value: 'working',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
    {
      label: 'Resigned',
      value: 'resigned',
    },
  
  ];
const closeModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Layout> */}
        {/* <Navbar /> */}
        {/* <div style={{ margin: 40 }}>
          <BreadCrumbs
            imagesrc='/images/attendance.svg'
            location='Employee Management'
            location1='View Employee'
          />
          <hr />
          <div
            className='attendance-filters-bottom d-flex '
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <input
              type='text'
              placeholder='Search members'
              className='search-field'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            />
            <div className='div' style={{ display: 'flex', gap: 10 }}>
              <Selects
                defaultValue='allStatus'
                onSelect={onSelect}
                value={status}
                options={WorkingCondition}
                placeHolder='Search'

              />

              <button className='primary-btn' onClick={showModal}>
                <FontAwesomeIcon icon={faPlus} /> Add Employee
              </button>
            </div>
          </div>
        </div> */}
      {/* </Layout> */}

        <h3 className='modal-title'>ADD EMPLOYEE</h3>
        <div className='mb-4'>
          <div style={{paddingInline: 5 }}>
  
            <Form layout='vertical' onFinish={update?onUpdateEmployee:onFinish} autoComplete='off'>
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
                      initialValue={update? employeeData?.employeeName:''}

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
                  // initialValue={update?employeeData.dob:''}


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
                  // initialValue={update?.employeeData.gender:''}
                >
                  <Radio.Group onChange={onChangeRadio} value={gender}>
                    <Radio value={'male'}>Male</Radio>
                    <Radio value={'female'}>Female</Radio>
                    <Radio value={'other'}>Other</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className='row p-0'>
                <h3 className='add-employee__section-header'>
                  {' '}
                  Office Details
                </h3>
                <hr />
                <div className='add-employee__section p-0'>
                  {thirdRow.map((item) => (
                    <Form.Item
                      className='form-input col'
                      name={item.name}
                      label={item.label}
                      rules={[{ required: true, message: item.message }]}
                      initialValue={update?item.initialValue:''}

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
                    initialValue={update?item.initialValue:''}  

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
                    placeholder='Search to Status'
                    style={{
                      marginTop: '20px',
                      gap: '30px',
                    }}
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
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
                //   initialValue={getEmployeeData?getEmployeeData.designation:''}

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
                //   initialValue={getEmployeeData?getEmployeeData.projectTeam:''}

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
                    //   initialValue={getEmployeeData?item.initialValue:''}

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

              <div className='form-footer' style={{display:'flex',gap:10,}} >
              <Button type='primary' htmlType='submit'>
                  Add
                </Button>
              <Button type='primary' onClick={() => closeModal()} danger>
                Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>

    </>
  );
};

export default EmployeeForm;
