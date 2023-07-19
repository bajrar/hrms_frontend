import { Form } from 'antd';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import FormContainer from './forms/FormContainer';

export type EmployeeInitialValues =
  | {
      idType: string;
      employeeId: string;
      dob: { bsDate: string };
      mobile: string;
      dateOfJoining: { bsDate: string };
      confirmationDate: { bsDate: string };
      designation: string;
      probationPeriod: string;
      count: string;
      contactName: string;
      contact: string;
      relation: string;
      projectName: string;
      projectPermission: string;
      bankName: string;
      bankAccount: string;
      branch: string;
      ssf: string;
      pan: string;
    }
  | {};
type FormControllerProps = {
  isLoading: boolean;
  initialValues: EmployeeInitialValues;
  closeModal: (state: boolean) => void;
  handleSubmit: (values: EmployeeInitialValues) => void;
};

const FormController = ({ initialValues, isLoading, closeModal, handleSubmit }: FormControllerProps) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const onFinish = async (values: any) => {
    try {
      setDisabled(true);
      await handleSubmit(values);
      toast.success('Employee Submitted Sucesfully');
    } catch (err: any) {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    } finally {
      closeModal(false);
    }
  };

  return (
    <FormContainer
      form={form}
      isLoading={isLoading}
      isFormDisabled={disabled}
      closeModal={closeModal}
      handleSubmit={onFinish}
    />
  );
};

export default FormController;
