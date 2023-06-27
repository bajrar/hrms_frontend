import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, Select } from 'antd';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import NepaliDate from 'nepali-date-converter';

/* Assets */
import '../employeeDetails.css';
import '../add-employee-form.css';

import { Employee } from '../Tabs/TabContainer';

type BasicInfoFormProps = {
  closeModal: (state: boolean) => void;
  changeTab: (key: string) => void;
  formValues: Employee;
  setFormValues: React.Dispatch<React.SetStateAction<Employee>>;
  tabControls: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfficeDetailsForm = ({
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
    changeTab('3');
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
              className='form-input col'
              label='Email *'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input valid email!',
                  pattern:
                    /^[a-zA-Z0-9_.+-]+@(eeposit\.com|virtuosway\.com.np)$/,
                },
              ]}
            >
              <Input
                name='email'
                placeholder='Enter email address (e.g. example@email.com)'
                className='form-input-wrapper'
                type='text'
              />
            </Form.Item>

            <Form.Item
              className='form-input col'
              label='Mobile Number * '
              name='mobile'
              initialValue='test@eeposit.com'
              rules={[
                { required: true, message: 'Please input your Mobile Number!' },
              ]}
            >
              <Input
                name='mobile'
                placeholder='Enter phone number (e.g. 9368745698)'
                className='form-input-wrapper'
                type='number'
              />
            </Form.Item>
          </div>

          <div className='row add-employee__section__tab p-2'>
            <Form.Item
              label='Confirmation Date *'
              className='form-input col'
              name='confirmationDate'
              // initialValue={moment(employeeData?.dateOfJoining)}
            >
              <Calendar
                className=' date-picker calender-container-picker '
                language='en'
                dateFormat='YYYY/MM/DD'
              />
            </Form.Item>
            <Form.Item
              className='form-input col'
              label='Designation *'
              name='designation'
              rules={[
                { required: true, message: 'Please input your designation!' },
              ]}
            >
              <Input
                name='employeeId'
                placeholder='Enter job title or designation (e.g. Senior Manager)'
                className='form-input-wrapper'
                type='text'
              />
            </Form.Item>
          </div>

          <div className='row add-employee__section__tab p-2'>
            <Form.Item
              className='form-input col'
              label='Reporting Manager *'
              name='reportingManager'
              rules={[
                {
                  required: true,
                  message: 'Please input your reporting manager!',
                },
              ]}
            >
              <Input
                name='reportingManager'
                placeholder='Enter the name of reporting manager (e.g. John Doe)'
                className='form-input-wrapper'
                type='text'
              />
            </Form.Item>

            <Form.Item
              label='Status * '
              className='form-input col'
              name='status'
              initialValue={{}}
            >
              <Select
                showSearch
                size='large'
                placeholder='Select status'
                style={{}}
                optionFilterProp='children'
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'working',
                    label: 'Working',
                  },
                  {
                    value: 'resigned',
                    label: 'Resigned',
                  },
                  {
                    value: 'pending',
                    label: 'Pending',
                  },
                ]}
              />
            </Form.Item>
            <div className='add-employee__section p-0'></div>
          </div>

          <div className='row  add-employee__section__tab p-2'>
            <Form.Item
              label='Date of Joining *'
              className='form-input col'
              name='dateOfJoining'
              // initialValue={moment(employeeData?.dateOfJoining)}
            >
              <Calendar
                className=' date-picker calender-container-picker'
                language='en'
                dateFormat='YYYY/MM/DD'
              />
            </Form.Item>

            <div className='form-input col'>
              <div className='row'>
                <Form.Item
                  label='Probation Period :'
                  className='form-input col-8 mx-3'
                  name='probationPeriod'
                  rules={[
                    {
                      required: true,
                      message: 'Probation period required',
                    },
                  ]}
                  initialValue={{}}
                >
                  <Select
                    size='large'
                    showSearch
                    placeholder='Days'
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    options={[
                      { label: '1 month', value: '1 month' },
                      { label: '3 months', value: '3 months' },
                      { label: '6 months', value: '6 months' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  className='form-input col-3 form-input-wrapper'
                  name='count'
                  rules={[{ required: true, message: 'Days count required' }]}
                  initialValue={{}}
                >
                  <Input
                    name='count'
                    size='large'
                    placeholder='Days'
                    type='number'
                    style={{ marginTop: '1.85rem', height: 'inherit' }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className='row add-employee__section__tab p-2'>
            <Form.Item
              className='form-input col'
              label='Project Name *'
              name='projectName'
              rules={[
                { required: true, message: 'Please input your Project Name!' },
              ]}
            >
              <Input
                name='projectName'
                placeholder='Enter email address (e.g. example@email.com)'
                className='form-input-wrapper'
                type='text'
              />
            </Form.Item>

            <Form.Item
              label='Project Permission *'
              className='form-input col my-1'
              name='projectPermission'
              rules={[
                {
                  required: true,
                  message: 'Project Permission required',
                },
              ]}
              initialValue={{}}
            >
              <Select
                size='large'
                showSearch
                placeholder='Days'
                optionFilterProp='children'
                className='form-input-wrapper'
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                options={[
                  { label: 'Owner', value: 'owner' },
                  { label: 'Admin', value: 'admin' },
                  { label: 'Member', value: 'member' },
                ]}
              />
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

export default OfficeDetailsForm;
