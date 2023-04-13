import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import './addLeaveForm.css';

import { useDispatch } from 'react-redux';
import { apis } from '../apis/constants/ApisService';
import { getLeave } from '../../redux/features/leaveSlice';
import { leaveUnit } from '../../utils/Constants';

const AddLeaveForm = ({ setIsModalOpen }: any) => {
  const { TextArea } = Input;

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const res = await apis.addLeave(values);
      if (res.status === 201) {
        message.success('Leave Created');
        form.resetFields();
        dispatch(getLeave() as any);
      }
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className='add-leave-form'>
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item
          className='form-input col'
          name='leaveName'
          label='Leave Name *'
          rules={[{ required: true, message: 'Shift Name is Required' }]}
        >
          <Input
            name='leaveName'
            placeholder='Enter the name of the new shift'
            className='form-input-wrapper'
            type='text'
          />
        </Form.Item>
        <div className='form-second-row align-items-start '>
          <div className='d-flex align-items-end' style={{ gap: 16 }}>
            <Form.Item
              className='form-input col unit-input'
              name='unit'
              label='Unit *'
              rules={[{ required: true, message: 'Shift Name is Required' }]}
              tooltip={{
                title:
                  'This field specifies the time unit (days, hours, etc.) for the leave.',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                placeholder='Days'
                className='selects form-input-wrapper leave-unit-selects'
                options={leaveUnit}
              />
            </Form.Item>
            <Form.Item
              className='form-input col unit-input'
              name='leaveUnit'
              label=<div></div>
              rules={[{ required: true, message: 'Shift Name is Required' }]}
            >
              <Input
                placeholder='60'
                className='form-input-wrapper days-input'
                type='number'
                onClick={(e) =>
                  form.setFieldValue('leaveUnit', Number(e.target))
                }
              />
            </Form.Item>
          </div>
          <Form.Item
            className='form-input col'
            name='maximumUnitAllowed'
            label='Maximum Unit Allowed *'
            rules={[{ required: true, message: 'Shift Name is Required' }]}
          >
            <Input
              placeholder='Enter the maximum unit allowed (e.g. 100 days)'
              className='form-input-wrapper'
              type='text'
            />
          </Form.Item>
        </div>
        <Form.Item
          className='form-input col'
          name='leaveDeatils'
          label='Leave Details'
        >
          <TextArea
            style={{ height: 96, resize: 'none' }}
            // onChange={onChange}
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            '
          />
        </Form.Item>
        <Form.Item name='accumulated' valuePropName='checked'>
          <Checkbox className='accumulated-check'>Accumulated</Checkbox>
        </Form.Item>
        <div className='form-btn-container'>
          <Button type='default'>Cancel</Button>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddLeaveForm;
