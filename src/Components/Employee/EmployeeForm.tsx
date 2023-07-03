import { useEffect, useState, memo, useMemo } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, DatePicker, Select } from 'antd';
import { toast } from 'react-toastify';

import { apis, axiosApiInstance } from '../apis/constants/ApisService';
import './add-employee-form.css';
import { useDispatch } from 'react-redux';
import { getSingleEmployee } from '../../redux/features/singleEmployeeSlice';
import moment from 'moment';
import { getEmployee } from '../../redux/features/employeeSlice';
import dayjs from 'dayjs';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import NepaliDate from 'nepali-date-converter';
import { CalendarOutlined } from '@ant-design/icons';

export const selectedEmployee = (state: any, id: string) => state?.find((item: any) => item?.employeeNumber === id);

export const EmployeeForm = ({
  setIsModalOpen,
  update = false,
  employeeId = '',
  isDisable = false,
  defaultValue: employeeData = {},
}: any) => {
  const [gender, setGender] = useState('');
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const currentDate = new NepaliDate(new Date()).format('YYYY-MM-DD');
  // const [employeeData, setEmployeeData] = useState({} as any);
  const dispatch = useDispatch();
  const [getDateOfJoining, setDateOfJoining] = useState();
  const [getDob, setDob] = useState();
  const defaultDob = employeeData?.dob?.split('/').join('-');
  const defaultdateOfJoining = employeeData?.dateOfJoining?.split('/').join('-');
  console.log(defaultDob, defaultdateOfJoining);
  // useEffect(()=>{
  //   dispatch(getSingleEmployee())
  // },[])
  // const { employee } = useAppSelector(
  //   (state) => state.singleEmployeeSlice?.employee
  // );

  // const employeeData = update ? selectedEmployee(employee, employeeId) : {}

  // console.log({employee},'<------ employeeee')
  // console.log({employeeId})

  // useEffect(() => {
  //   dispatch(
  //     getSingleEmployee({
  //       employeeId,
  //     }) as any
  //   );
  // }, []);

  const onStartDateChange = ({ bsDate }: any) => {
    setDateOfJoining(bsDate);
  };
  const onDobChange = ({ bsDate }: any) => {
    setDob(bsDate);
  };

  const onSearch = (value: string) => {
    setSearchText(value);
  };
  const onChange = (value: string) => {
    setSearchText(value);
  };

  const [form] = Form.useForm();
  const onSelect = (e: any) => {
    setStatus(e);
  };
  const onFinish = async (values: any) => {
    const { dateOfJoining, dob, ...rest } = values;

    try {
      const res = await apis.addEmployee({
        ...rest,
        dob: getDob,
        dateOfJoining: getDateOfJoining,
      });

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
  //   const getData = (data:any,isOpen:Boolean)=>{
  //     setGetEmployeeData(data)
  //   }

  useEffect(() => {
    const {
      designation,
      email,
      employeeNumber,
      gender,
      mobileNumber,
      reportingManager,
      employeeName,
      dob,
      projectTeam,
      emergency,
    } = employeeData;

    form.setFieldsValue({
      designation,
      email,
      employeeNumber,
      gender,
      mobileNumber,
      employeeName,
      reportingManager,
      projectTeam,
      dob: dayjs(dob, 'YYYY/MM/DD'),
      emergency,
    });
  }, [employeeData]);
  if (!setIsModalOpen) {
    return <> </>;
  }

  const onUpdateEmployee = async (values: any) => {
    const { dateOfJoining, dob, ...rest } = values;
    try {
      const res = await apis.updateEmployee(
        { ...rest, dob: getDob, dateOfJoining: getDateOfJoining },
        employeeData._id,
      );
      if (res.status === 201) {
        form.resetFields();
        getEmployee();
        setIsModalOpen(false);
      }
    } catch {
    } finally {
      setIsModalOpen(false);
    }
  };
  const firstRow = [
    {
      name: 'employeeNumber',
      label: 'Employee Number',
      message: 'Employee Number is Required',
      placeHolder: 'EX: 6854654163',
      type: 'number',
      initialValue: employeeData?.employeeNumber,
    },
    {
      name: 'employeeName',
      label: 'Employee Name',
      message: 'Employee Name is Required',
      placeHolder: 'John Doe',
      type: 'text',
      initialValue: employeeData?.employeeName,
    },
  ];
  const OfficeDetails1stRow = [
    {
      name: 'email',
      label: 'Email',
      message: 'Email Required',
      placeHolder: 'johndoe@gmail.com',
      type: 'email',
      initialValue: employeeData?.email,
    },
    {
      name: 'mobileNumber',
      label: 'Mobile Number',
      message: 'Mobile Number is Required',
      placeHolder: 'EX: 6854654163',
      type: 'number',
      initialValue: employeeData?.mobileNumber,
    },
  ];
  const emergencyContact = [
    {
      name: 'emergencyName',
      label: 'Emergency Contact Name',
      message: 'Emergency Contact Name Required',
      placeHolder: 'EX: John Doe',
      type: 'text',
      initialValue: employeeData?.emergency?.name,
    },
    {
      name: 'emergencyContact',
      label: 'Emergency Contact Number',
      message: 'Emergency Contact Number Required',
      placeHolder: 'EX: 2541210',
      type: 'number',
      initialValue: employeeData?.emergency?.contact,
    },
  ];

  const emergencyLast = [
    {
      name: 'relationToEmoloyee',
      label: 'Relation to Emoloyee',
      message: 'Required',
      placeHolder: 'Enter relationship of contact person (e.g. parents)',
      type: 'text',
      initialValue: employeeData?.emergency?.relation,
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

  const dateFormat = 'YYYY/MM/DD';
  console.log(employeeData?.emergency, '<----------- employe data');
  return (
    <>
      <h2 className="fs-4 fw-bold p-0" style={{ color: 'var(--primary-color-100-brand-color, #023C87)' }}>
        UPDATE EMPLOYEE
      </h2>
      <br />
      <div className="mb-4">
        <div style={{ paddingInline: 5 }}>
          <Form
            layout="vertical"
            onFinish={update ? onUpdateEmployee : onFinish}
            autoComplete="off"
            form={form}
            initialValues={{ name: employeeData?.employeeName }}
            disabled={isDisable}
          >
            <div className="row p-0 mb-1">
              <h2 className="add-employee__section-header fs-5">Basic Information</h2>
              <hr />
              <div className="add-employee__section p-0">
                {firstRow.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.label}</span>}
                      // label={item.label}
                      rules={[{ required: true, message: item.message }]}
                      initialValue={item.initialValue}
                      key={index + item?.name}
                    >
                      <Input
                        name={item.name}
                        placeholder={item.placeHolder}
                        className="form-input-wrapper"
                        type={item.type}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </div>
            <div className="row add-employee__section">
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Date of Birth</span>}
                className="form-input col"
                name="dob"
                initialValue={moment(employeeData?.dob)}
              >
                <div className="calendar-wrapper">
                  <Calendar
                    onChange={onDobChange}
                    className="date-picker calender-container-picker-custom"
                    dateFormat="YYYY/MM/DD"
                    language="en"
                    defaultDate={defaultDob}
                    maxDate={currentDate}
                  />
                  <CalendarOutlined className="calendar-icon" />
                </div>
              </Form.Item>

              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Gender</span>}
                className="form-input col form-input-container"
                name="gender"
                // initialValue={update?.employee.gender:''}
              >
                <Radio.Group onChange={onChangeRadio} value={gender}>
                  <Radio value={'male'}>Male</Radio>
                  <Radio value={'female'}>Female</Radio>
                  <Radio value={'other'}>Other</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="row p-0 mt-4 mb-1">
              <h3 className="add-employee__section-header fs-5"> Office Details</h3>
              <hr />
              <div className="add-employee__section p-0 mb-1">
                {OfficeDetails1stRow.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.label}</span>}
                      rules={[{ required: true, message: item.message }]}
                      initialValue={item.initialValue}
                      id={index + item?.name}
                    >
                      <Input
                        name={item.name}
                        placeholder={item.placeHolder}
                        className="form-input-wrapper"
                        type={item.type}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </div>
            <div className="row add-employee_section p-0 mb-1">
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Date of Joining</span>}
                className="form-input col form-input-container-fourth"
                name="dateOfJoining"
                // initialValue={moment(employeeData?.dateOfJoining)}
              >
                <div className="calendar-wrapper">
                  <Calendar
                    onChange={onStartDateChange}
                    defaultDate={defaultdateOfJoining}
                    className=" date-picker calender-container-picker-custom"
                    dateFormat="YYYY/MM/DD"
                    maxDate={currentDate}
                    language="en"
                    // hideDefaultValue
                  />
                  <CalendarOutlined className="calendar-icon" />
                </div>
              </Form.Item>

              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Reporting Manager</span>}
                className="form-input col form-input-container-fourth"
                name="reportingManager"
                rules={[{ required: true, message: 'required' }]}
                initialValue={employeeData?.reportingManager}
                style={{ maxWidth: '24rem' }}
              >
                <Input
                  name="reportingManager"
                  placeholder="Reporting Manager"
                  className="form-input-wrapper"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="row add-employee__section p-0 mb-1">
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</span>}
                className="form-input col form-input-container-fourth"
                name="status"
                initialValue={employeeData?.status}
              >
                <Select
                  showSearch
                  placeholder="Search to Status"
                  className="form-input-wrapper selects"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
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
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Designation</span>}
                className="form-input col form-input-container-fourth"
                name="designation"
                initialValue={update ? employeeData.designation : ''}
              >
                <Input name="designation" placeholder="Designation" className="form-input-wrapper" type="text" />
              </Form.Item>
              {/* <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Project Team</span>}
                className="form-input  form-input-container-fourth"
                name="projectTeam"
                initialValue={update ? employeeData.projectTeam : ''}
              >
                <Input name="projectTeam" placeholder="Project Team" className="form-input-wrapper" type="text" />
              </Form.Item> */}
            </div>

            <div className="row p-0 my-4">
              <h3 className="add-employee__section-header fs-5">Emergency Contact Details</h3>
              <hr />
              <div className="add-employee__section p-0">
                {emergencyContact.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.label}</span>}
                      rules={[{ required: false }]}
                      initialValue={item.initialValue}
                      key={index + item?.name}
                    >
                      <Input
                        name={item.name}
                        placeholder={item.placeHolder}
                        className="form-input-wrapper"
                        type={item.type}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </div>

            <div className="row add-employee__section">
              {emergencyLast.map((item, index) => {
                return (
                  <Form.Item
                    className="form-input col"
                    name={item.name}
                    label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.label}</span>}
                    rules={[{ required: false }]}
                    initialValue={item.initialValue}
                    key={index + item?.name}
                  >
                    <Input
                      name={item.name}
                      placeholder={item.placeHolder}
                      className="form-input-wrapper"
                      type={item.type}
                    />
                  </Form.Item>
                );
              })}
            </div>

            <div className="form-footer mt-4" style={{ display: 'flex', gap: 10 }}>
              <Button type="primary" htmlType="submit">
                {update ? 'Update' : 'Add'}
              </Button>
              <Button type="primary" onClick={() => closeModal()} danger>
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
