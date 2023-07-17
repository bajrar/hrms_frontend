import { Form, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddEmployeeMutation } from '../../../redux/api/employeeApiSlice';
import BasicInfoForm from '../forms/BasicInfoForm';
import ContactDetails from '../forms/ContactDetails';
import OfficeDetails from '../forms/OfficeDetails';
import OnboardingForm from '../forms/OnboardingForm';

type TabItems = {
  label: string;
  key: string;
  children: React.ReactNode;
};

type TabContainerProps = {
  closeModal: (state: boolean) => void;
  setMaskClosable: (state: boolean) => void;
};

type CustomDate = {
  bsDate: string;
  adDate: string;
};

export type Employee = {
  idType: string;
  employeeId: string;
  employeeName: string;
  dateOfJoining: CustomDate;
  gender: string;
  email: string;
  mobile: string;
  confirmationDate: CustomDate;
  designation: string;
  reportingManager: string;
  status: string;
  probationPeriod: string;
  count: string;
  projectPermission: string;
  contactName: string;
  contact: string;
  relation: string;
};

const TabContainer = ({ closeModal, setMaskClosable }: TabContainerProps) => {
  const [activeKey, setActiveKey] = useState('1');
  const [disabledForm, setDisabledForm] = useState<boolean>(false);
  const [disabledTab, setDisabledTab] = useState<boolean>(true);
  const [disabledTab2, setDisabledTab2] = useState<boolean>(true);
  const [disabledTab3, setDisabledTab3] = useState<boolean>(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const onKeyChange = (key: string) => {
    setActiveKey(key);
  };

  const onFinish = async (values: any) => {
    const inputs = { ...values };
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
      bankName,
      bankAccount,
      branch,
      ssf,
      pan,
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
      payroll: {
        bankMeta: {
          name: bankName,
          account: bankAccount,
          branch: branch,
        },
        ssf: ssf,
        pan: pan,
      },
    };
    try {
      setMaskClosable(false);
      setDisabledForm(true);
      await addEmployee(payload);
      message.success('Employee Submitted Sucesfully');
      navigate('/employee');
    } catch (err: any) {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    } finally {
      closeModal(false);
    }
  };

  const handleTabChange = () => {
    console.log('hadnle tab change');
    switch (activeKey) {
      case '1':
        setDisabledTab(false);
        setActiveKey('2');
        break;
      case '2':
        setDisabledTab2(false);
        setActiveKey('3');
        break;
      case '3':
        setDisabledTab3(false);
        setActiveKey('4');
        break;
      default:
        break;
    }
  };

  const tabItems = [
    {
      label: 'Basic Information',
      key: '1',
      children: (
        <BasicInfoForm
          closeModal={closeModal}
          form={form}
          disabledForm={disabledForm}
          handleTabChange={handleTabChange}
        />
      ),
    },
    {
      label: 'Official Details',
      key: '2',
      children: (
        <OfficeDetails
          closeModal={closeModal}
          form={form}
          disabledForm={disabledForm}
          handleTabChange={handleTabChange}
        />
      ),
      disabled: disabledTab,
    },
    {
      label: 'Emergency Contact Details',
      key: '3',
      children: (
        <ContactDetails
          closeModal={closeModal}
          form={form}
          disabledForm={disabledForm}
          handleTabChange={handleTabChange}
        />
      ),
      disabled: disabledTab2,
    },
    {
      label: 'Onboarding',
      key: '4',
      children: (
        <OnboardingForm
          closeModal={closeModal}
          form={form}
          isLoading={isLoading}
          disabledForm={disabledForm}
          onFinish={onFinish}
        />
      ),
      disabled: disabledTab3,
    },
  ];

  return <Tabs type="card" items={tabItems} activeKey={activeKey} onChange={onKeyChange} />;
};
export default TabContainer;
