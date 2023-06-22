import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, Select } from 'antd';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import NepaliDate from 'nepali-date-converter';
import { ToastContainer, toast } from 'react-toastify';

import { apis } from '../../apis/constants/ApisService';
import { Employee } from '../Tabs/TabContainer';

/* Assets */
import '../employeeDetails.css';
import '../add-employee-form.css';

type BasicInfoFormProps = {
  closeModal: (state: boolean) => void;
  formValues: Employee;
  setFormValues: React.Dispatch<React.SetStateAction<Employee>>;
};

const ContactDetail = ({ closeModal, formValues }: BasicInfoFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    /* on mount fetch data from redux store */
  }, []);

  const closeModalHandler = () => {
    form.resetFields();
    closeModal(false);
  };

  const onFinish = async (values: any) => {
    const inputs = { ...formValues, ...values };
    const {
      idType,
      employeeId,
      dob,
      mobile,
      dateOfJoining,
      confirmationDate,
      designation,
      probationPeriod,
      count,
      contactName,
      contact,
      relation,
      projectName,
      projectPermission,
      ...rest
    } = inputs;

    const payload = {
      ...rest,
      employeeNumber: employeeId,
      dob: dob.bsDate,
      mobileNumber: mobile,
      dateOfJoining: dateOfJoining.bsDate,
      confirmationDate: confirmationDate.bsDate,
      designation,
      probation: { type: probationPeriod, count },
      emergency: { name: contactName, contact, relation },
      project: { name: projectName, permission: projectPermission },
    };

    try {
      const res = await apis.addEmployee(payload);
      if (res.status === 201) {
        toast.success('Employee Submitted Sucesfully', {
          position: 'top-center',
          autoClose: 5000,
        });
        window.location.reload();
      }
    } catch (err: any) {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
                label='Contact Name *'
                name='contactName'
                rules={[{ required: true, message: 'Please input your Contact Name !' }]}
              >
                <Input
                  name='email'
                  placeholder='Enter the name of contact person (e.g. Jane Doe)'
                  className='form-input-wrapper'
                  type='text'
                />
              </Form.Item>

              <Form.Item
                className='form-input col'
                label='Contact Number * '
                name='contact'
                rules={[{ required: true, message: 'Please input your Contact Number!' }]}
              >
                <Input
                  name='mobile'
                  placeholder='Enter contact number (e.g. 9368745698)'
                  className='form-input-wrapper'
                  type='number'
                />
              </Form.Item>
            </div>

            <div className='row add-employee__section__tab p-2'>
              <Form.Item
                className='form-input col-6'
                label='Relation to employee*'
                name='relation'
                rules={[{ required: true, message: 'Please input your relation!' }]}
              >
                <Input
                  name='email'
                  placeholder='Enter the relationship of contact person (e.g. parent)'
                  className='form-input-wrapper'
                  type='text'
                />
              </Form.Item>
            </div>

            <div className='form-footer' style={{ display: 'flex', gap: 10 }}>
              <Button type='primary' onClick={() => closeModalHandler()} danger>
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
