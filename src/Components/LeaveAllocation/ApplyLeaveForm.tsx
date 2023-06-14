import { Button, Form, Input, Select, message } from 'antd';
import Selects from '../Ui/Selects/Selects';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { IForm } from '../Shifts/AddShiftForm';
import { useAppSelector } from '../../hooks/useTypedSelector';
import './addLeaveForm.css';
import { useEffect, useState } from 'react';
import { reduceByKeys } from '../../hooks/HelperFunctions';
import { apis } from '../apis/constants/ApisService';
import { RootState } from '../../store';
import {
  useApplyLeaveMutation,
  useGetLeavesQuery,
} from '../../redux/api/leaveSlice';
import { useGetUserProfileQuery } from '../../redux/features/profileSlice';

const ApplyLeaveForm = ({ setIsModalOpen }: IForm) => {
  const [leaveNameArray, setLeaveNameArray] = useState<any[]>([]);
  const [leaveNameSelect, setLeaveNameSelect] = useState<any[]>([]);
  const [form] = Form.useForm();

  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;
  const { data: employeeData } = useGetUserProfileQuery(tokenData.userSn || '');
  const { data, isLoading } = useGetLeavesQuery('leave');
  const [applyLeave, { data: leaveResponse }] = useApplyLeaveMutation();
  useEffect(() => {
    const leaveNameArray = reduceByKeys(data?.leave, '_id', 'leaveName');
    setLeaveNameArray(leaveNameArray);
  }, [data?.leave, isLoading]);
  useEffect(() => {
    if (leaveNameArray) {
      const leaveArray = leaveNameArray?.map((leaveName: any) => {
        return {
          label: leaveName?.label,
          value: leaveName?.value,
        };
      });
      setLeaveNameSelect(leaveArray);
    }
  }, [leaveNameArray]);

  const onleaveName = (value: any) => {
    form.setFieldValue('leaveName', value);
    const result = form.getFieldValue('leaveName');
  };

  const onCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const { TextArea } = Input;

  const onFinish = async (values: any) => {
    const { startDate, endTime, leaveName, ...rest } = values;

    try {
      await applyLeave({
        from: startDate.bsDate,
        to: endTime.bsDate,
        employeeId: employeeData?.employee?.employeeNumber,
        employeeName: employeeData?.employee?.employeeName,
        id: values.leaveName,
        ...rest,
      });
      // const res = await apis.applyLeave(
      //   {
      //     from: startDate.bsDate,
      //     to: endTime.bsDate,
      //     employeeId: employeeData?.employee?.employeeNumber,
      //     employeeName: employeeData?.employee?.employeeName,
      //     ...rest,
      //   },
      //   values.leaveName
      // );
      // if (res.status === 200) {
      //   message.success('Leave Applied');
      //   form.resetFields();
      // }
      setIsModalOpen(false);
    } catch {
      message.error('Something Went Wrong');
    } finally {
      // setIsModalOpen(false);
    }
  };
  useEffect(() => {
    if (leaveResponse?.message === 'leave applied') {
      message.success(leaveResponse?.message);
      form.resetFields();
    }
  }, [leaveResponse]);
  return (
    <div className='assign-leave-form'>
      <Form layout='vertical' onFinish={onFinish}>
        <div className='d-flex form-second-row align-items-start'>
          <Form.Item
            className='form-input col'
            name='leaveName'
            label='Select Leave *'
            rules={[{ required: true, message: 'Leave Name is Required' }]}
          >
            <Select
              placeholder='Select the type of leave'
              className='selects form-input-wrapper'
              options={leaveNameSelect}
              onSelect={onleaveName}
            />
          </Form.Item>
          <Form.Item
            className='form-input col shift-time'
            name='approvedBy'
            label='Approved By *'
            rules={[
              {
                required: true,
                message: 'Start time is Required',
              },
            ]}
          >
            <Input
              placeholder='Enter the name of the person who approved this leave'
              className='form-input-wrapper'
              type='text'
            />
          </Form.Item>
        </div>
        {userRole === 'admin' && (
          <div className='form-second-row align-items-start '>
            <Form.Item
              className='form-input col unit-input'
              name='employeeId'
              label='Employee ID *'
              rules={[{ required: true, message: 'Shift Name is Required' }]}
            >
              <Input
                placeholder='Type the employee ID to search and select'
                className='form-input-wrapper days-input'
                type='text'
              />
            </Form.Item>
            <Form.Item
              className='form-input col'
              name='employeeName'
              label='Employee Name *'
              rules={[{ required: true, message: 'Shift Name is Required' }]}
            >
              <Input
                placeholder='Enter the maximum unit allowed (e.g. 100 days)'
                className='form-input-wrapper'
                type='text'
              />
            </Form.Item>
          </div>
        )}

        <div className='d-flex align-items-center start-end-container '>
          <Form.Item
            className='form-input col shift-time'
            name='startDate'
            label='Select Date *'
            rules={[
              {
                required: true,
                message: 'Start time is Required',
              },
            ]}
          >
            <Calendar
              // onChange={onStartDateChange}
              className=' date-picker  '
              dateFormat='YYYY/MM/DD'
              language='en'
            />
          </Form.Item>

          <Form.Item
            className='form-input col shift-time'
            name='endTime'
            label=<div></div>
            rules={[
              {
                required: true,
                message: 'End time is Required',
              },
            ]}
          >
            <Calendar
              // onChange={onEndDateChange}
              className='date-picker '
              dateFormat='YYYY/MM/DD'
              language='en'
            />
          </Form.Item>
        </div>

        <Form.Item
          className='form-input col mt-2'
          name='reason'
          label='Reason for leave *'
        >
          <TextArea
            style={{ height: 96, resize: 'none' }}
            // onChange={onChange}
            placeholder='Enter the reason for your leave'
          />
        </Form.Item>

        <div className='form-btn-container mt-2'>
          <Button type='default' onClick={() => onCancel()}>
            Cancel
          </Button>

          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ApplyLeaveForm;
