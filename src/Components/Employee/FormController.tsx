import { Form } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import FormContainer from './forms/FormContainer';
import useEmployee from '../../hooks/useEmployee';

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
  const { transformInput } = useEmployee();
  // const memoizedTransformInput = useCallback(() => transformInput, [transformInput]);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    console.log(initialValues);
    const mappedInput = transformInput(initialValues);
    form.setFieldsValue(mappedInput);
  }, [initialValues]);

  const onFinish = async (values: any) => {
    try {
      setDisabled(true);
      await handleSubmit(values);
      toast.success('Employee Submitted Sucesfully', {
        position: 'top-center',
        autoClose: 5000,
      });
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
