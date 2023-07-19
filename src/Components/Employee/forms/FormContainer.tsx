import { Form, FormInstance, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddEmployeeMutation } from '../../../redux/api/employeeApiSlice';
import BasicInfoForm from '../forms/BasicInfoForm';
import ContactDetails from '../forms/ContactDetails';
import OfficeDetails from '../forms/OfficeDetails';
import OnboardingForm from '../forms/OnboardingForm';
import { EmployeeInitialValues } from '../FormController';

type TabItems = {
  label: string;
  key: string;
  children: React.ReactNode;
};

type TabContainerProps = {
  form: FormInstance<any>;
  isFormDisabled: boolean;
  isLoading: boolean;
  closeModal: (state: boolean) => void;
  handleSubmit: (values: EmployeeInitialValues) => void;
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

const TabContainer = ({ form, isFormDisabled, isLoading, handleSubmit, closeModal }: TabContainerProps) => {
  const [activeKey, setActiveKey] = useState('1');
  const [disabledTab, setDisabledTab] = useState<boolean>(true);
  const [disabledTab2, setDisabledTab2] = useState<boolean>(true);
  const [disabledTab3, setDisabledTab3] = useState<boolean>(true);

  const onKeyChange = (key: string) => {
    setActiveKey(key);
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
          isFormDisabled={isFormDisabled}
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
          isFormDisabled={isFormDisabled}
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
          isFormDisabled={isFormDisabled}
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
          isFormDisabled={isFormDisabled}
          onFinish={handleSubmit}
        />
      ),
      disabled: disabledTab3,
    },
  ];

  return <Tabs type="card" items={tabItems} activeKey={activeKey} onChange={onKeyChange} />;
};
export default TabContainer;
