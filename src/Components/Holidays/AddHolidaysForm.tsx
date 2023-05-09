import React from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { IForm } from '../Shifts/AddShiftForm';
import { apis } from '../apis/constants/ApisService';
import { applicableTo, statusArray } from '../../utils/Constants';
import { getHolidays } from '../../redux/features/holidaysSlice';

const AddHolidaysForm = ({ setIsModalOpen }: IForm) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const res = await apis.addHolidays(values);
      if (res.status === 201) {
        message.success('Holidays Created');
        form.resetFields();
        dispatch(getHolidays() as any);
      }
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onStartChange = ({ bsDate }: any) => {
    form.setFieldValue('startDate', bsDate);
  };
  const onEndChange = ({ bsDate }: any) => {
    form.setFieldValue('endDate', bsDate);
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldValue('notes', e.target.value);
  };

  return (
    <div>
      <Form
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        className='shift-assign-form'
        form={form}
      >
        <div className='form-second-row align-items-start'>
          <Form.Item
            className='form-input col'
            name='holidayName'
            label='Holiday Name *'
            rules={[{ required: true, message: 'Shift Name is Required' }]}
          >
            <Input
              name='shiftName'
              placeholder='Enter the name of the new shift'
              className='form-input-wrapper'
              type='text'
            />
          </Form.Item>
          <Form.Item
            className='form-input col working-day'
            name='applicableTo'
            label='Applicable To *'
            rules={[{ required: true, message: 'Working day is Required' }]}
          >
            <Select
              placeholder='Select who this rule/policy is applicable to'
              className='selects form-input-wrapper'
              // onChange={onWorkingDaySelection}
              suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
              popupClassName='custom-select-dropdown'
              options={applicableTo}
            />
          </Form.Item>
        </div>

        <div className='d-flex align-items-end start-end-time'>
          <Form.Item
            className='form-input col shift-time'
            name='startDate'
            label='Select Date *'
            rules={[
              {
                required: true,
                message: 'Start date is Required',
              },
            ]}
          >
            <Calendar
              onChange={onStartChange}
              className='date-picker  '
              dateFormat='YYYY/MM/DD'
              language='en'
            />
          </Form.Item>
          <div className='dash'>-</div>
          <Form.Item
            className='form-input col shift-time'
            name='endDate'
            label=<div></div>
            rules={[
              {
                required: true,
                message: 'End date is Required',
              },
            ]}
          >
            <Calendar
              onChange={onEndChange}
              className='date-picker '
              dateFormat='YYYY/MM/DD'
              language='en'
            />
          </Form.Item>
        </div>

        <Form.Item
          className='form-input col '
          name='status'
          label='Status *'
          rules={[{ required: true, message: 'Working day is Required' }]}
        >
          <Select
            placeholder='Select the status of this day (e.g. repeat pattern)'
            className='selects form-input-wrapper'
            // onChange={onWorkingDaySelection}
            suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
            popupClassName='custom-select-dropdown'
            options={statusArray}
          />
        </Form.Item>
        <Form.Item
          className='form-input col'
          name='notes'
          label='Notes *'
          rules={[{ required: true, message: 'Device name is required' }]}
        >
          <TextArea
            style={{ height: 96, resize: 'none' }}
            onChange={onChange}
            placeholder='Enter any additional notes or comments related to this holiday'
          />
        </Form.Item>
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

export default AddHolidaysForm;
