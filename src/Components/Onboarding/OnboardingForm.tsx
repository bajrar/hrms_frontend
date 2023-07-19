import { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProfileQuery, useUpdateEmployeeMutation } from '../../redux/api/employeeApiSlice';

import { IForm } from '../Shifts/AddShiftForm';

/* ASSETS */
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

const defaultValue = {
  employeeName: '',
  emailAddress: '',
  bankName: '',
  bankAccount: '',
  branch: '',
  ssf: '',
  pan: '',
};

const useConditionalFetch = (id: string) => {
  const shouldFetch = !!id; // Check if ID exists (truthy)
  // Use RTK Query hook conditionally based on whether the ID exists
  return useGetProfileQuery(id, { skip: !shouldFetch });
};

const OnboardingForm = ({ setIsModalOpen, shiftId: empId = '' }: IForm) => {
  const [initialValues, setInitialValues] = useState<typeof defaultValue>(defaultValue);
  const [form] = Form.useForm();

  const { error, isLoading, data: profileData } = useConditionalFetch(empId);
  const [handleUpdateOnboarding, result] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (!error && profileData) {
      const { employeeName, email, payroll } = profileData.employee;
      setInitialValues({
        employeeName,
        emailAddress: email,
        bankName: payroll?.bankMeta?.name,
        bankAccount: payroll?.bankMeta?.account,
        branch: payroll?.bankMeta?.branch,
        ssf: payroll?.ssf,
        pan: payroll?.pan,
      });
    }
  }, [isLoading, profileData, error]);

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  const onFinish = async (values: any) => {
    const { employeeName, emailAddress, bankName, bankAccount, branch, ssf, pan } = values;
    console.log(values);
    try {
      await handleUpdateOnboarding({
        employeeName: employeeName,
        email: emailAddress,
        payroll: {
          bankMeta: {
            name: bankName,
            account: bankAccount,
            branch: branch,
          },
          ssf: ssf,
          pan: pan,
        },
      });
      toast.success('Employee Submitted Sucesfully', {
        position: 'top-center',
        autoClose: 5000,
      });
    } catch {
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  console.log(initialValues);

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        autoComplete="off"
        className="shift-assign-form"
        form={form}
      >
        <div className="form-second-row align-items-start mb-4">
          <Form.Item
            className="form-input col"
            name="employeeName"
            label="Employee Name *"
            rules={[{ required: true, message: 'Employee Name required' }]}
          >
            <Input placeholder="Enter full name (e.g. John Smith)" className="form-input-wrapper" type="text" />
          </Form.Item>

          <Form.Item
            className="form-input col"
            name="emailAddress"
            label="Employee Email Address *"
            rules={[
              {
                required: true,
                message: 'Please input valid email!',
                pattern: /^[a-zA-Z0-9_.+-]+@(eeposit\.com|virtuosway\.com.np)$/,
              },
            ]}
          >
            <Input placeholder="Enter email (e.g. John@eeposit.com)" className="form-input-wrapper" type="text" />
          </Form.Item>
        </div>

        <div className="form-second-row align-items-start mb-4">
          <Form.Item
            className="form-input col"
            name="bankName"
            label="Bank Name *"
            rules={[{ required: true, message: 'Name required' }]}
          >
            <Input placeholder="Enter Bank name" className="form-input-wrapper" type="text" />
          </Form.Item>
          <Form.Item
            className="form-input col"
            name="bankAccount"
            label="Bank A/C No * "
            rules={[{ required: true, message: 'A/C required' }]}
          >
            <Input placeholder="Enter Bank account" className="form-input-wrapper" type="number" />
          </Form.Item>
          <Form.Item
            className="form-input col"
            name="branch"
            label="Branch name *"
            rules={[{ required: true, message: 'Branch required' }]}
          >
            <Input placeholder="Enter branch name" className="form-input-wrapper" type="text" />
          </Form.Item>
        </div>

        <div className="form-second-row align-items-start mb-4">
          <Form.Item className="form-input col" name="ssf" label="SSF No (If any)" rules={[{ required: false }]}>
            <Input placeholder="Enter SSF No" className="form-input-wrapper" type="number" />
          </Form.Item>
          <Form.Item className="form-input col" label="PAN No (If any)" name="pan" rules={[{ required: false }]}>
            <Input placeholder="Enter  PAN No" className="form-input-wrapper" type="number" />
          </Form.Item>
        </div>

        <div className="form-btn-container" style={{ marginTop: 15 }}>
          <Button type="default" onClick={handleCancel}>
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

export default OnboardingForm;
