import { useEffect, useState } from 'react';
import { Button, Form, FormInstance, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { toast } from 'react-toastify';

/* ASSETS */
import '../add-employee-form.css';

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
};

type OnboardingFormProps = {
  closeModal: (state: boolean) => void;
  form: FormInstance<any>;
  isLoading: boolean;
  onFinish: (values: any) => void;
  isFormDisabled?: boolean;
};

const OnboardingForm = ({ closeModal, form, onFinish, isLoading, isFormDisabled }: OnboardingFormProps) => {
  const [initialValues, setInitialValues] = useState<typeof defaultValue>(defaultValue);

  // useEffect(() => {
  //   if (!error && profileData) {
  //     const { employeeName, email, payroll } = profileData.employee;
  //     setInitialValues({
  //       employeeName,
  //       emailAddress: email,
  //       bankName: payroll?.bankMeta?.name,
  //       bankAccount: payroll?.bankMeta?.account,
  //       branch: payroll?.bankMeta?.branch,
  //       ssf: payroll?.ssf,
  //       pan: payroll?.pan,
  //     });
  //   }
  // }, [isLoading, profileData, error]);

  const handleModalClose = () => {
    form.resetFields();
    closeModal(false);
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        autoComplete="off"
        className="shift-assign-form"
        form={form}
        disabled={isFormDisabled}
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
            name="email"
            label="Employee Email Address *"
            rules={[
              {
                required: true,
                message: 'Please input valid email!',
                pattern: /^[a-zA-Z0-9_.+-]+@(eeposit\.com|virtuosway\.com.np)$/,
              },
            ]}
          >
            <Input placeholder="Enter email (e.g. John@eeposit.com)" className="form-input-wrapper" type="email" />
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

        <div className="form-footer" style={{ marginTop: 15, gap: 10 }}>
          <Button type="default" onClick={handleModalClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OnboardingForm;
