import { useState, useEffect } from 'react';
import { Select, Input, Button, Form, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useApplyLeaveMutation, useGetLeavesQuery } from '../../../redux/api/leaveSlice';
import { IForm } from '../../Shifts/AddShiftForm';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { CalendarOutlined } from '@ant-design/icons';
const ApplyLeaveForm = ({ setIsModalOpen }: IForm) => {
  const [form] = Form.useForm();
  const { isLoading, error, data: leaveData } = useGetLeavesQuery('/leave');
  const [applyLeaveHandler] = useApplyLeaveMutation();

  const [leaveNameSelect, setLeaveNameSelect] = useState<any>();

  const onStartChange = ({ bsDate }: any) => {
    form.setFieldValue('startDate', bsDate);
  };
  const onEndChange = ({ bsDate }: any) => {
    form.setFieldValue('endDate', bsDate);
  };

  const onFinish = (values: any) => {
    console.log('🚀 ~ file: ApplyLeaveForm.tsx:21 ~ onFinish ~ values:', values);
  };

  return (
    <div className="assign-leave-form">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="row mb-2">
          <div className="col-6">
            <Form.Item
              className="form-input p-3"
              name="employeeName"
              label="Employee Name *"
              rules={[{ required: true, message: 'Please input Employee Name!' }]}
            >
              <Input placeholder="Enter employee name" className="form-input-wrapper" type="text" />
            </Form.Item>
          </div>

          <div className="col-6">
            <Form.Item
              className="form-input p-3"
              name="project"
              label="Project"
              rules={[
                {
                  required: true,
                  message: 'Please Enter project name',
                },
              ]}
            >
              <Input placeholder="Enter project name" className="form-input-wrapper" type="text" />
            </Form.Item>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">
            <Form.Item name="leave" label="Select Leave *" className="form-input p-3">
              <Select
                size="large"
                defaultValue="lucy"
                className="selects form-input-wrapper"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </div>

          <div className="col-6">
            <Form.Item name="manager" label="Assigned Manager *" className="form-input p-3">
              <Select
                defaultValue="lucy"
                className="selects form-input-wrapper"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">
            <Form.Item
              className="form-input p-3"
              name="startDate"
              label="Select Date *"
              rules={[
                {
                  required: true,
                  message: 'Start date is Required',
                },
              ]}
            >
              <Calendar onChange={onStartChange} className=" date-picker  " dateFormat="YYYY/MM/DD" language="en" />
              <CalendarOutlined className="calendar-icon" />
            </Form.Item>
          </div>

          <div className="col-6">
            <Form.Item
              className="form-input p-3"
              name="endDate"
              label=" "
              rules={[
                {
                  required: true,
                  message: 'End date is Required',
                },
              ]}
            >
              <Calendar onChange={onEndChange} className="date-picker " dateFormat="YYYY/MM/DD" language="en" />
              <CalendarOutlined className="calendar-icon" />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="form-input col mt-2" name="reason" label="Reason for leave *">
          <TextArea
            style={{ height: 96, resize: 'none' }}
            // onChange={onChange}
            placeholder="Enter the reason for your leave"
          />
        </Form.Item>

        <div className="form-btn-container mt-4">
          <Button type="default" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>

          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ApplyLeaveForm;
