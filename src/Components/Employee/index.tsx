import { useEffect, useState } from 'react';
import { Button, Select, Table, Typography, Form } from 'antd';

import './add-employee-form.css';
import BreadCrumbs from '../Ui/BreadCrumbs/BreadCrumbs';
import Selects from '../Ui/Selects/Selects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../Ui/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { CompareFunction } from '../Ui/Tables/AttendaceReport';
import { ColumnsType } from 'antd/es/table';
import { EmployeeStats } from '../../pages/Attendance/Attendance';
import {
  useAddEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from '../../redux/api/employeeApiSlice';
import FormController, { EmployeeInitialValues } from './FormController';
import useEmployee from '../../hooks/useEmployee';
import { useForm } from 'antd/es/form/Form';
import ProfileView from './ProfileView';

export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
}

export const Employee = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { transformPayload } = useEmployee();
  const { data: employee, isLoading: loading } = useGetEmployeeQuery('onboarded');
  const [addEmployeeHandler, { isLoading: isSubmitting }] = useAddEmployeeMutation();
  const [updateEmployeeHandler, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMaskClosable, setIsMaskClosable] = useState<boolean>(true);
  // const [UpdateisModalOpen, setUpdateIsModalOpen] = useState<boolean>(false);
  // const [getEmployeeData,setGetEmployeeData] = useState({}as any)
  const [activeEmployee, setActiveEmployee] = useState<any>(undefined);
  const [activeEmployeeView, setActiveEmployeeView] = useState<any>(undefined);
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DATE OF JOINING',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'DESIGNATION',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.split('-').map((ite: any, i: number) => {
              return (
                <EmployeeStats
                  key={i}
                  status={ite}
                  color={
                    CompareFunction(ite) === 'working'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'pending'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'resigned'
                      ? '#BB2124'
                      : 'transparent'
                  }
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'ACTION',
      dataIndex: 'view',
      key: 'view',
      render: (item) => {
        // console.log(item);
        return (
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon
              icon={faPen}
              color="#35639F"
              // onClick={() => updateEmployee(id)}
              onClick={() => {
                setActiveEmployee({ ...item });
              }}
            />
            <Button
              className="viewMoreBtn"
              onClick={() => {
                setActiveEmployeeView({ ...item });
              }}
              type="text"
            >
              VIEW
            </Button>
            {/* <Link
              className='viewMoreBtn'
              to={`/employee/${item}`}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              View
            </Link> */}
          </div>
        );
      },
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

  useEffect(() => {
    const data1: DataType[] = [];
    employee?.employee?.map((userData: any, sn: any) => {
      if (userData.employeeName.toLowerCase().includes(searchText)) {
        const dateObject = new Date(userData?.dateOfJoining);
        const formattedDate = dateObject?.toISOString()?.split('T')[0];
        const tableData = {
          id: userData?.employeeNumber,
          key: userData?.employeeNumber,
          date: userData?.dateOfJoining,
          name: userData?.employeeName,
          status: userData.status,
          designation: userData?.designation,
          dob: userData?.dob,
          view: userData,
          // sn: sn + 1,
        };
        data1.push(tableData);
      }
    });

    setAttendanceData(data1);
  }, [employee, searchText]);

  useEffect(() => {
    const sortedData = [...attendanceData].sort((a, b) => a.name.localeCompare(b.name));
    const data = status ? sortedData.filter((each: any) => each.status === status) : sortedData;
    for (let i = 0; i < data.length; i++) {
      data[i]['sn'] = i + 1;
    }
    setFilterData(data);
  }, [attendanceData, status]);

  const onSelect = (e: any) => {
    setStatus(e);
  };

  const handleAddEmployee = async (values: EmployeeInitialValues) => {
    setIsMaskClosable(false);
    const payload = transformPayload(values);
    addEmployeeHandler(payload);
  };

  const handleUpdateEmployee = async (values: any) => {
    setIsMaskClosable(false);
    const payload = transformPayload(values);
    updateEmployeeHandler({ ...payload, id: activeEmployee?._id });
    setActiveEmployee(undefined);
  };
  return (
    <>
      <div style={{ margin: 40 }}>
        <BreadCrumbs imagesrc="/images/attendance.svg" location="Employee Management" location1="View Employee" />
        <hr />
        <div className="attendance-filters-bottom d-flex " style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            placeholder="Search names"
            className="search-field"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
          <div className="div" style={{ display: 'flex', gap: 10 }}>
            <Selects
              defaultValue="allStatus"
              onSelect={onSelect}
              value={status}
              options={WorkingCondition}
              placeHolder="Search"
            />

            <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="attendace-page">
        <div className="row table-container">
          <Table
            rowClassName={(record) =>
              record.status === 'resigned' ? 'absent-class' : record.status === 'pending' ? 'holiday-class' : ''
            }
            columns={columns}
            dataSource={filterData}
            loading={loading}
          />
        </div>
      </div>
      {/* <EmployeeForm/> */}

      <ModalComponent
        openModal={isModalOpen}
        classNames="add-employee-modal holidays-modal"
        closeModal={setIsModalOpen}
        destroyOnClose={true}
        maskClosable={isMaskClosable}
      >
        <Typography.Title level={5} style={{ letterSpacing: 1.2, marginBottom: '0.8rem' }}>
          EMPLOYEE ONBOARDING
        </Typography.Title>
        <FormController
          closeModal={setIsModalOpen}
          handleSubmit={handleAddEmployee}
          isLoading={isSubmitting}
          initialValues={{}}
        />

        {/* <h3 className='modal-title'>ADD EMPLOYEE</h3> 
        <div className='mb-4'>
          <div style={{paddingInline: 5 }}>
  
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
                      initialValue={getEmployeeData?item.initialValue:''}
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
                  initialValue={getEmployeeData?.dob}

                >
                  <DatePicker
                    placeholder="dd/mm/yyyy"
                    className="form-input-contain"
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
                  initialValue={getEmployeeData?getEmployeeData.gender:''}

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
                      initialValue={getEmployeeData?item.initialValue:''}

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
                    initialValue={getEmployeeData?item.initialValue:''}

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
                  initialValue={getEmployeeData?getEmployeeData.designation:''}

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
                  initialValue={getEmployeeData?getEmployeeData.projectTeam:''}

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
                      initialValue={getEmployeeData?item.initialValue:''}

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
              <Button type='primary' onClick={showModal} danger>
                Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div> */}
      </ModalComponent>
      {/* <ModalComponent
        openModal={!!activeEmployee}
        classNames='holidays-modal'
        closeModal={() => setActiveEmployee(undefined)}
      >
        <EmployeeForm
          update
          setIsModalOpen={() => setActiveEmployee('')}
          employeeId={activeEmployee}
          defaultValue={activeEmployee}
        />
      </ModalComponent> */}
      <ModalComponent
        openModal={!!activeEmployee}
        classNames="holidays-modal"
        closeModal={() => setActiveEmployee(undefined)}
        destroyOnClose={true}
        maskClosable={isMaskClosable}
      >
        {/* {!!activeEmployee && (
          <EmployeeForm
            update
            setIsModalOpen={() => setActiveEmployee('')}
            employeeId={activeEmployee} 
            defaultValue={activeEmployee}
          />
        )} */}
        {!!activeEmployee && (
          <>
            <Typography.Title level={5} style={{ letterSpacing: 1.2, marginBottom: '0.8rem' }}>
              UPDATE STATUS
            </Typography.Title>
            <FormController
              closeModal={() => setActiveEmployee(undefined)}
              handleSubmit={handleUpdateEmployee}
              isLoading={isUpdating}
              initialValues={activeEmployee}
            />
            {/* <Form onFinish={handleUpdateEmployee} form={form} autoComplete="off">
              <Form.Item
                className="form-input col"
                name="status"
                label="Status *"
                rules={[{ required: true, message: 'Status is Required' }]}
              >
                <Select
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'working', label: 'Working' },
                    { value: 'resigned', label: 'Resigned' },
                  ]}
                  className="selects status-selects"
                  placeholder="Update status"
                ></Select>
              </Form.Item>
              <div className="form-btn-container mt-4">
                <Button type="default" onClick={() => setActiveEmployee(undefined)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </div>
            </Form> */}
          </>
        )}
      </ModalComponent>

      {/* view Details */}

      <ModalComponent
        openModal={!!activeEmployeeView}
        classNames="add-employee-modal holidays-modal"
        closeModal={() => setActiveEmployeeView(undefined)}
      >
        <ProfileView activeEmployee={activeEmployeeView} />
      </ModalComponent>

      {/* view Details */}

      {/* <Modal
        open={!!activeEmployee}
        onOk={() => setActiveEmployee(undefined)}
        onCancel={() => setActiveEmployee(undefined)}
        closable
        okText={'okText'}
      >
        {!!activeEmployee && (
          <EmployeeForm
            update
            setIsModalOpen={() => setActiveEmployee('')}
            employeeId={activeEmployee}
            defaultValue={activeEmployee}
          />
        )}
      </Modal> */}
    </>
  );
};

export default Employee;
