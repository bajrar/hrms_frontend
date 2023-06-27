import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { Button, Form, Input, Radio, Select } from 'antd';
import React, { useEffect } from 'react';

/* Assets */
import { Employee } from '../Tabs/TabContainer';
import '../add-employee-form.css';
import '../employeeDetails.css';

type BasicInfoFormProps = {
  closeModal: (state: boolean) => void;
  changeTab: (key: string) => void;
  formValues: Employee;
  setFormValues: React.Dispatch<React.SetStateAction<Employee>>;
  tabControls: React.Dispatch<React.SetStateAction<boolean>>;
};

const BasicInfoForm = ({
  closeModal,
  changeTab,
  formValues,
  setFormValues,
  tabControls,
}: BasicInfoFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    /* on mount fetch data from redux store */
  }, []);

  const closeModalHandler = () => {
    form.resetFields();
    closeModal(false);
  };

  const onFinish = (values: any) => {
    setFormValues({ ...formValues, ...values });
    tabControls(false);
    changeTab('2');
  };

  return (
    <div className='mb-4'>
      <div style={{ paddingInline: 5 }}>
        <Form
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
          form={form}
          initialValues={{}}
        >
          <div className='row add-employee__section__tab p-2 mt-4'>
            <Form.Item
              label='Employee ID series * '
              className='form-input col'
              name='idType'
              initialValue={{}}
            >
              <Select
                showSearch
                size='large'
                placeholder='Select employee ID'
                style={{}}
                optionFilterProp='children'
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'manual',
                    label: 'Manual',
                  },
                  {
                    value: 'auto',
                    label: 'Auto',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              className='form-input col'
              label='Employee ID series * '
              name='employeeId'
              rules={[{ required: true, message: 'Please input your Employee ID!' }]}
            >
              <Input
                name='employeeId'
                placeholder='Enter employee ID number (e.g. 001)'
                className='form-input-wrapper'
                type='number'
              />
            </Form.Item>
          </div>

          <div className='row add-employee__section__tab p-2'>
            <Form.Item
              className='form-input col'
              label='Employee Name *'
              name='employeeName'
              rules={[{ required: true, message: 'Please input your Employee Name!' }]}
            >
              <Input
                name='employeeId'
                placeholder='Enter full name (e.g. John Smith)'
                className='form-input-wrapper'
                type='text'
              />
            </Form.Item>

            <Form.Item
              label='Date of Birth *'
              className='form-input col'
              name='dob'
              // initialValue={moment(employeeData?.dateOfJoining)}
            >
              <Calendar
                className=' date-picker calender-container-picker'
                placeholder='Enter date of birth (e.g. yyyy/mm/dd)'
                language='en'
                dateFormat='YYYY/MM/DD'
              />
            </Form.Item>
          </div>

          <div className='row add-employee__section__tab p-2'>
            <Form.Item
              label='Gender'
              className='form-input'
              name='gender'
              rules={[{ required: true, message: 'Please select your gender' }]}
              // initialValue={update?.employee.gender:''}
            >
              <Radio.Group>
                <Radio value={'male'}>Male</Radio>
                <Radio value={'female'}>Female</Radio>
                <Radio value={'other'}>Other</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className='form-footer' style={{ display: 'flex', gap: 10 }}>
            <Button type='primary' onClick={() => closeModalHandler()} danger>
              Cancel
            </Button>
            <Button type='primary' htmlType='submit'>
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BasicInfoForm;