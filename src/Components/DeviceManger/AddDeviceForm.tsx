import { Button, Form, Input, message, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { getDevices } from '../../redux/features/addedDeviceSlice';
import { apis } from '../apis/constants/ApisService';
import './addDeviceForm.css';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import dayjs from 'dayjs';
import { useState } from 'react';

export interface DataType {
  date: string;
  shiftName: string;
  workingDays: string;
  time: string;
  shiftScheduling: string;
  device: string;
  view?: React.ReactNode;
}

const AddDeviceForm = ({ setIsModalOpen }: any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [time, setTime] = useState('');

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const onDateSelect = ({ bsDate }: any) => {
    form.setFieldValue('date', bsDate);
  };
  const onTimeChange = (value: any) => {
    setTime(value);
    form.setFieldValue('time', time);
  };

  const onFinish = async (values: any) => {
    try {
      const res = await apis.addDevice(values);
      if (res.status === 200) {
        message.success('Device Created');
        setIsModalOpen(false);
        form.resetFields();
        dispatch(getDevices() as any);
      }
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className='add-device-form'>
      <Form
        layout='vertical'
        onFinish={onFinish}
        form={form}
        autoComplete='off'
      >
        <Form.Item
          className='form-input col'
          name='deviceName'
          label='Device Name *'
          rules={[{ required: true, message: 'Shift Name is Required' }]}
        >
          <Input
            placeholder='Enter the name of new device'
            className='form-input-wrapper'
          />
        </Form.Item>
        <div className='d-flex second-row-column'>
          <Form.Item
            className='form-input col'
            name='location'
            label='Location *'
            rules={[{ required: true, message: 'Location is Required' }]}
          >
            <Input
              placeholder='Enter the location of device'
              className='form-input-wrapper'
            />
          </Form.Item>
          <Form.Item
            className='form-input col'
            name='ipAddress'
            label='IP address:'
            rules={[{ required: false, message: 'IP is Required' }]}
            extra='Note: Please make sure the IP address entered is correct.'
          >
            <Input
              placeholder='Enter IP address'
              className='form-input-wrapper'
            />
          </Form.Item>
        </div>
        <div className='d-flex align-items-end second-row-column'>
          <Form.Item
            className='form-input col'
            name='date'
            label='Last sync date and time *'
            rules={[{ required: true, message: 'Last Sync Date is Required' }]}
          >
            {/* <Input placeholder='Select date' /> */}
            <Calendar
              // onChange={onStartDateChange}
              onChange={onDateSelect}
              className=' date-picker  '
              dateFormat='YYYY/MM/DD'
              language='en'
            />
          </Form.Item>
          <Form.Item
            className='form-input col'
            name='time'
            label=''
            rules={[{ required: true, message: 'Last Sync Time is Required' }]}
          >
            <TimePicker
              name='startTime'
              onSelect={onTimeChange}
              use12Hours
              format='HH:mm a'
              defaultOpenValue={dayjs('00:00', 'HH:mm')}
              placeholder='Start Time'
              className='start-time'
              value={dayjs(time, 'HH:mm')}
            />
          </Form.Item>
        </div>
        <div className='form-btn-container'>
          <Button type='default' onClick={handleCancel}>
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

export default AddDeviceForm;
