import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, message } from 'antd';

import { reduceByKeys } from '../../hooks/HelperFunctions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getUsers } from '../../redux/features/attendanceSlice';
import { getShift } from '../../redux/features/shiftSlice';
import { apis } from '../apis/constants/ApisService';
import Selects from '../Ui/Selects/Selects';
import { IForm } from './AddShiftForm';

const AssignShiftForm = ({ setIsModalOpen }: IForm) => {
  const [shiftNameArrays, setShiftNameArrays] = useState<any[]>([]);
  const [shiftNameSelect, setShiftNameSelect] = useState<any[]>([]);
  const [employeeNameArrays, setEmployeeNameArrays] = useState<any[]>([]);
  const [employeeNameSelect, setEmployeeNameSelect] = useState<any[]>([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const res = await apis.assignShifts(values, values.shiftName);
      if (res.status === 201) {
        message.success('Shift Created');
      }
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const { TextArea } = Input;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldValue('shiftNotes', [e.target.value]);
  };
  useEffect(() => {
    dispatch(getShift() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers({ status: '' }) as any);
  }, [dispatch]);

  const { data } = useAppSelector((state) => state.shiftSlice);
  const { user } = useAppSelector((state) => state.attendanceSlice);

  useEffect(() => {
    const shiftNameArray = reduceByKeys(data?.shift, '_id', 'shiftName');
    setShiftNameArrays(shiftNameArray);
  }, [data]);

  useEffect(() => {
    if (shiftNameArrays) {
      const shiftArray = shiftNameArrays?.map((shiftName: any) => {
        return {
          label: shiftName?.label,
          value: shiftName?.value,
        };
      });
      setShiftNameSelect(shiftArray);
    }
  }, [shiftNameArrays]);

  useEffect(() => {
    const employeeNameArray = reduceByKeys(
      user,
      'employeeNumber',
      'employeeName'
    );
    setEmployeeNameArrays(employeeNameArray);
  }, [user]);

  useEffect(() => {
    if (employeeNameArrays) {
      const employeeArray = employeeNameArrays?.map((employeeName: any) => {
        return {
          label: employeeName?.label,
          value: employeeName?.value,
        };
      });
      setEmployeeNameSelect(employeeArray);
    }
  }, [employeeNameArrays]);

  const onShiftName = (value: string) => {
    form.setFieldValue('shiftName', value);
  };
  const onEmployeeName = (value: string) => {
    form.setFieldValue('assignTo', value);
  };

  return (
    <div className='assign-shift-form'>
      <Form
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        className='shift-assign-form'
        form={form}
      >
        <Form.Item
          className='form-input col'
          name='shiftName'
          label='Shift Name *'
          rules={[{ required: true, message: 'Shift Name is Required' }]}
        >
          <Selects
            placeHolder='Select the shift name'
            className='form-input-wrapper'
            options={shiftNameSelect}
            onSelect={onShiftName}
          />
        </Form.Item>
        <Form.Item
          className='form-input col'
          name='assignTo'
          label='Assign To *'
          rules={[{ required: false }]}
        >
          <Selects
            placeHolder='Type the name of an employee to search and select'
            mode='multiple'
            options={employeeNameSelect}
            onSelect={onEmployeeName}
          />
        </Form.Item>
        <Form.Item
          className='form-input col'
          name='shiftNote'
          label='Shift Notes *'
          rules={[{ required: true, message: 'Device name is required' }]}
        >
          <TextArea
            style={{ height: 96, resize: 'none' }}
            onChange={onChange}
            placeholder='Enter any notes or comments related to the shift'
          />
        </Form.Item>
        <div className='form-btn-container'>
          <Button type='default' onClick={handleCancel}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            Assign
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AssignShiftForm;
