import { Button, Form, Input, Select } from 'antd';
import { DatePicker, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { toast, ToastContainer } from 'react-toastify';
import { apis } from '../apis/constants/ApisService';
const { RangePicker } = DatePicker;

type Props = {};

export const AsignShift = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { Date, ...rest } = values;
    let From = Date[0].$d;
    let To = Date[1].$d;
    values = { Date: { From, To }, ...rest };

    try {
      const res = await apis.addShift(values);
      if (res.status === 201) {
        toast.success('Shift Added Sucesfully', {
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
        <h1>Assign Shift</h1>
        <hr />
        <div className='virtuosway-hr-leaveform form'>
          <Form layout='vertical' onFinish={onFinish} onReset={onReset}>
            <Form.Item
              name='applicableFor'
              label='Applicable For'
              rules={[
                { required: true, message: 'Applicable For is Required!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='shiftName'
              label='Shift Name'
              rules={[{ required: true, message: 'Shift Name is Required!' }]}
            >
              <Select placeholder='Select'>
                <Select.Option value='day'>Day</Select.Option>
                <Select.Option value='morning'>Morning</Select.Option>
                <Select.Option value='evening'>Evening</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='Date'
              label='Date'
              rules={[{ required: true, message: ' Date is Required!' }]}
            >
              <RangePicker />
            </Form.Item>

            <Form.Item
              name='Reason'
              label='Reason '
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
