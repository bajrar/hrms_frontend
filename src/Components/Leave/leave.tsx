import { Button, Form, Input, Select } from 'antd';
import { DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ToastContainer, toast } from 'react-toastify';
import { apis } from '../apis/constants/ApisService';
import './leave.css';
const { RangePicker } = DatePicker;

type Props = {};

export const Leave = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { Date, ...rest } = values;
    let From = Date[0].$d;
    let To = Date[1].$d;
    values = { Date: { From, To }, ...rest };
    console.log('Success:', values);
    try {
      const res = await apis.addLeave(values);
      if (res.status === 201) {
        toast.success('Leave Added Sucesfully', {
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

  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <ToastContainer />
      <div className='virtuosway-hr-leaveform'>
        <h1>Leave Form</h1>
        <hr />
        <div className='virtuosway-hr-leaveform form'>
          <Form layout='vertical' onFinish={onFinish} onReset={onReset}>
            <Form.Item
              name='empId'
              label='Employee Id'
              rules={[{ required: true, message: 'Employee Id is Required!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='leaveType'
              label='Leave Type'
              rules={[{ required: true, message: 'Leave Type is Required!' }]}
            >
              <Select placeholder='Select'>
                <Select.Option value='Sick'>Sick</Select.Option>
                <Select.Option value='Vacation'>Vacation</Select.Option>
                <Select.Option value='Chill'>Chill</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='Date'
              label='Date'
              rules={[{ required: true, message: 'Date is Required!' }]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              name='teamEmail'
              label='Team Email Id'
              rules={[
                { required: true, message: 'Team Email Id is Required!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='reasonOfLeave'
              label='Reason for leave'
              rules={[{ required: true, message: 'Reason is Required!' }]}
            >
              <TextArea />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              SUBMIT
            </Button>
            <Button htmlType='reset'>Reset</Button>
          </Form>
        </div>
      </div>
    </>
  );
};
