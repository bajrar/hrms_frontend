import { useEffect, useState, memo, useMemo } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, DatePicker, Select } from 'antd';
import { toast } from 'react-toastify';

import { apis, axiosApiInstance } from '../../apis/constants/ApisService';
import '../add-employee-form.css';

import { useDispatch } from 'react-redux';

import { getEmployee } from '../../../redux/features/employeeSlice';
import dayjs from 'dayjs';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import NepaliDate from 'nepali-date-converter';
import { MdCalendarToday } from 'react-icons/md';

export const selectedEmployee = (state: any, id: string) => state?.find((item: any) => item?.employeeNumber === id);

export const AddProjectForm = ({
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
        employeeData._id,
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
      name: 'ProjectName',
      label: 'Project Name',
      message: 'Required!',
      placeHolder: 'Enter the name of new project',
      type: 'text',
    },
  ];
  const secondRow = [
    {
      name: 'Department/Section *',
      label: 'Department / Section',
      message: 'Required!',
      placeHolder: 'Enter the department',
      type: 'text',
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
      <h3 className="modal-title">ADD NEW PROJECT</h3>
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
            <div className="row p-0 mb-4">
              <div className="add-employee__section p-0">
                {firstRow.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={item.label}
                      rules={[{ required: true, message: item.message }]}
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
            <div className="row mb-4">
              <div className="add-employee__section p-0">
                {secondRow.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={item.label}
                      rules={[{ required: true, message: item.message }]}
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
                <Form.Item label="Date Added" className="form-input col" name="DateAdded">
                  <div className="calendar-wrapper">
                    <Calendar
                      onChange={onStartDateChange}
                      className="date-picker calender-container-picker-custom "
                      style={{ height: '48px' }}
                      dateFormat="YYYY/MM/DD"
                      maxDate={currentDate}
                      language="en"
                      // hideDefaultValue
                    />{' '}
                    <MdCalendarToday className="calendar-icon fs-5" />
                  </div>
                </Form.Item>
              </div>
            </div>

            <div
              className="form-footer"
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Button
                type="primary"
                className="d-flex justify-content-center align-items-center fs-6 px-4 py-4 text-center"
                htmlType="submit"
              >
                Apply
              </Button>
              <Button
                type="primary"
                className="d-flex justify-content-center align-items-center fs-6 px-4 py-4 text-center"
                onClick={() => closeModal()}
                danger
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProjectForm;
