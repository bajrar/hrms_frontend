import { useEffect, useState, memo, useMemo } from 'react';
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
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getSingleEmployee } from '../../redux/features/singleEmployeeSlice';
import moment from 'moment';
import { getEmployee } from '../../redux/features/employeeSlice';
import dayjs from 'dayjs';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';

export const selectedEmployee = (state: any, id: string) =>
  state?.find((item: any) => item?.employeeNumber === id);

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
  // const [employeeData, setEmployeeData] = useState({} as any);
  const dispatch = useDispatch();
  const [getDateOfJoining, setDateOfJoining] = useState();
  const [getDob, setDob] = useState();

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
        employeeData._id
      );
      if (res.status === 201) {
        form.resetFields();
        getEmployee();
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
  const thirdRow = [
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
  const fourthRow = [
    {
      name: 'reportingManager',
      label: 'Reporting Manager',
      message: 'Reporting Manager Required',
      type: 'text',
      initialValue: employeeData?.reportingManager,
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
      initialValue: employeeData?.emergencyName,
    },
    {
      name: 'emergencyContact',
      label: 'Emergency Contact Number',
      message: 'Emergency Contact Number Required',
      placeHolder: 'EX: 2541210',
      type: 'number',
      initialValue: employeeData?.emergencyContact,
    },
    {
      name: 'parentName',
      label: "Father's/Mother's Name",
      message: "Father's/ Mother's Name Required",
      placeHolder: 'John Doe',
      type: 'text',
      initialValue: employeeData?.parentName,
    },
    {
      name: 'spouseName',
      label: 'Spouse Name',
      message: 'Spouse Name Required',
      placeHolder: 'John Doe',
      type: 'text',
      initialValue: employeeData?.spouseName,
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
  return (
    <>
      <h3 className='modal-title'>
        {update ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE'}
      </h3>
      <div className='mb-4'>
        <div style={{ paddingInline: 5 }}>
          <Form
            layout='vertical'
            onFinish={update ? onUpdateEmployee : onFinish}
            autoComplete='off'
            form={form}
            initialValues={{ name: employeeData?.employeeName }}
            disabled={isDisable}
          >
            <div className='row p-0'>
              <h3 className='add-employee__section-header'>
                Basic Information
              </h3>
              <hr />
              <div className='add-employee__section p-0'>
                {firstRow.map((item, index) => {
                  return (
                    <Form.Item
                      className='form-input col'
                      name={item.name}
                      label={item.label}
                      rules={[{ required: true, message: item.message }]}
                      initialValue={item.initialValue}
                      key={index + item?.name}
                    >
                      <Input
                        name={item.name}
                        placeholder={item.placeHolder}
                        className='form-input-wrapper'
                        type={item.type}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </div>
            <div className='row add-employee__section'>
              <Form.Item
                label='Date of Birth'
                className='form-input  form-input-container'
                name='dob'
                // initialValue={employeeData.dob}
                initialValue={moment(employeeData?.dob)}
              >
                {/* <DatePicker
                  placeholder='yyyy/mm/dd'
                  format={dateFormat}
                  className='form-input-contain'
                  suffixIcon={
                    <div className='calendar-container'>
                      <img src='./images/calendar.svg' alt='calendar' />
                    </div>
                  }
                /> */}
                <Calendar
                  onChange={onDobChange}
                  className=' date-picker calender-container-picker '
                  dateFormat='YYYY/MM/DD'
                  language='en'
                  defaultDate={employeeData?.dob}
                />
                {employeeData?.dob}
              </Form.Item>

              <Form.Item
                label='Gender'
                className='form-input  form-input-container'
                name='gender'
                // initialValue={update?.employee.gender:''}
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
                {thirdRow.map((item, index) => (
                  <Form.Item
                    className='form-input col'
                    name={item.name}
                    label={item.label}
                    rules={[{ required: true, message: item.message }]}
                    initialValue={item.initialValue}
                    id={index + item?.name}
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
                  // initialValue={moment(employeeData?.dateOfJoining)}
                >
                  {/* <DatePicker
                    placeholder='yyyy/mm/dd'
                    className='form-input-contain'
                    suffixIcon={
                      <div className='calendar-container'>
                        <img src='./images/calendar.svg' />
                      </div>
                    }
                    value={employeeData?.dateOfJoining}
                  /> */}
                  <Calendar
                    onChange={onStartDateChange}
                    defaultValue={'2080/01/23'}
                    className=' date-picker calender-container-picker '
                    dateFormat='YYYY/MM/DD'
                    language='en'
                    // hideDefaultValue
                  />
                </Form.Item>
              </div>
            </div>
            <div className='row add-employee__section p-0'>
              {fourthRow.map((item, index) => (
                <Form.Item
                  className='form-input form-input-container-fourth'
                  name={item.name}
                  label={item.label}
                  rules={[{ required: true, message: item.message }]}
                  // initialValue={update?item.initialValue:''}
                  id={index + item?.name}
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
                initialValue={employeeData?.status}
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
                initialValue={update ? employeeData.designation : ''}
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
                initialValue={update ? employeeData.projectTeam : ''}
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
                    initialValue={item.initialValue}
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

            <div className='form-footer' style={{ display: 'flex', gap: 10 }}>
              <Button type='primary' htmlType='submit'>
                {update ? 'Update' : 'Add'}
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
