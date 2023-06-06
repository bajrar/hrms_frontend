import { useEffect, useState, memo, useMemo } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, DatePicker, Select, Row, Col } from 'antd';
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
import NepaliDate from 'nepali-date-converter';

export const selectedEmployee = (state: any, id: string) =>
  state?.find((item: any) => item?.employeeNumber === id);

export const ProfileForm = ({
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
    console.log(values);
    const { dateOfJoining, dob, ...rest } = values;

    /*  try {
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
    } */
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
      count,
      probationPeriod,
    } = employeeData;

    form.setFieldsValue({
      designation,
      email,
      employeeNumber,
      gender,
      mobileNumber,
      employeeName,
      reportingManager,
      count,
      probationPeriod,
      dob: dayjs(dob, 'YYYY/MM/DD'),
    });
  }, [employeeData]);

  const firstRow = [
    {
      name: 'employeeId',
      label: 'Employee Id',
      message: 'Employee Id is Required',
      placeHolder: '001',
      type: 'number',
      initialValue: employeeData?.employeeId,
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
      name: 'designation',
      label: 'Designation',
      message: 'Designation required',
      placeHolder: 'Associate Project Manager',
      type: 'text',
      initialValue: employeeData?.designation,
    },
    {
      name: 'reportingManager',
      label: 'Reporting Manager',
      message: 'Reporting Manager Required',
      placeHolder: 'John Doe',
      type: 'text',
      initialValue: employeeData?.reportingManager,
    },
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

  const dateFormat = 'YYYY/MM/DD';
  return (
    <>
      <Row>
        <Col span={16}>
          <p>Profile Information</p>
          <hr />
          <div className='mb-4'>
            <div style={{ paddingInline: 5 }}>
              <Form
                layout='vertical'
                onFinish={onFinish}
                autoComplete='off'
                form={form}
                initialValues={{ name: employeeData?.employeeId }}
                disabled={isDisable}
              >
                <div className='row p-0'>
                  <h3 className='add-employee__section-header'>Basic Information</h3>
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

                <div className='row p-0 mt-4'>
                  <div className='add-employee__section p-0'>
                    <Form.Item
                      label='Date of Birth'
                      className='form-input col'
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
                        className=' date-picker calender-container-picker'
                        dateFormat='YYYY/MM/DD'
                        language='en'
                        defaultDate={defaultDob}
                        maxDate={currentDate}
                      />
                    </Form.Item>

                    <Form.Item
                      label='Gender'
                      className='form-input col'
                      name='gender'
                      rules={[{ required: true, message: 'Gender required' }]}
                      initialValue={employeeData?.gender}
                    >
                      <Radio.Group
                        className='radio-container'
                        onChange={onChangeRadio}
                        value={gender}
                      >
                        <Radio value={'male'}>Male</Radio>
                        <Radio value={'female'}>Female</Radio>
                        <Radio value={'other'}>Other</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>

                <div className='row p-0 mt-4'>
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
                        key={index + item?.name}
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

                <div className='row p-0 mt-4'>
                  <div className='add-employee__section p-0'>
                    {fourthRow.map((item, index) => (
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
                          className='form-input-wrapper'
                          type={item.type}
                          placeholder={item.placeHolder}
                        />
                      </Form.Item>
                    ))}
                  </div>
                </div>

                <div className='row p-0 mt-4'>
                  <div className='add-employee__section p-0'>
                    <Form.Item
                      label='Date of Joining'
                      className='form-input col'
                      name='dateOfJoining'
                      initialValue={moment(employeeData?.dateOfJoining)}
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
                        defaultDate={defaultdateOfJoining}
                        className=' date-picker calender-container-picker '
                        dateFormat='YYYY/MM/DD'
                        maxDate={currentDate}
                        language='en'
                        // hideDefaultValue
                      />
                    </Form.Item>

                    <div className='form-input col'>
                      <div className='row'>
                        <Form.Item
                          label='Probation Period :'
                          className='form-input col-8 mx-3'
                          name='probationPeriod'
                          rules={[{ required: true, message: 'Probation period required' }]}
                          initialValue={employeeData?.probationPeriod}
                        >
                          <Select
                            size='large'
                            showSearch
                            placeholder='Days'
                            optionFilterProp='children'
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            options={[
                              { label: '1 month', value: '1 month' },
                              { label: '3 months', value: '3 months' },
                              { label: '6 months', value: '6 months' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item
                          className='form-input col-3 form-input-wrapper'
                          name='count'
                          rules={[{ required: true, message: 'Days count required' }]}
                          initialValue={employeeData?.count}
                        >
                          <Input
                            name='count'
                            size='large'
                            placeholder='Days'
                            type='number'
                            style={{ marginTop: '1.85rem', height: 'inherit' }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className='row p-0'>
              <h3 className='add-employee__section-header'>Emergency Contact Details</h3>
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
 */}
                <div className='form-footer mt-4' style={{ display: 'flex' }}>
                  <Button type='primary' htmlType='submit'>
                    Request Edit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
        <Col span={8}>PROJECTS</Col>
      </Row>
    </>
  );
};

export default ProfileForm;
