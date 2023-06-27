import { Tabs } from 'antd';
import React, { useState } from 'react';
import BasicInfoForm from '../Fragments/BasicInfoForm';
import ContactDetails from '../Fragments/ContactDetails';
import OfficeDetails from '../Fragments/OfficeDetails';

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

const initialState = {
  idType: '',
  employeeId: '',
  employeeName: '',
  dob: {
    bsDate: '',
    adDate: '',
  },
  gender: '',
  email: '',
  mobile: '',
  confirmationDate: {
    bsDate: '',
    adDate: '',
  },
  designation: '',
  reportingManager: '',
  status: '',
  dateOfJoining: {
    bsDate: '',
    adDate: '',
  },
  probationPeriod: '',
  count: '',
  projectPermission: '',
  contactName: '',
  contact: '',
  relation: '',
} as Employee;

const TabContainer = ({ closeModal, setMaskClosable }: TabContainerProps) => {
  const [activeKey, setActiveKey] = useState('1');
  const [formValues, setFormValues] = useState<Employee>(initialState);
  const [isTab, setIsTab] = useState<boolean>(true);
  const [isTab2, setIsTab2] = useState<boolean>(true);

  const onKeyChange = (key: string) => setActiveKey(key);

  const tabItems = [
    {
      label: 'Basic Information',
      key: '1',
      children: (
        <BasicInfoForm
          closeModal={closeModal}
          changeTab={onKeyChange}
          formValues={formValues}
          setFormValues={setFormValues}
          tabControls={setIsTab}
        />
      ),
    },
    {
      label: 'Official Details',
      key: '2',
      children: (
        <OfficeDetails
          closeModal={closeModal}
          changeTab={onKeyChange}
          formValues={formValues}
          setFormValues={setFormValues}
          tabControls={setIsTab2}
        />
      ),
      disabled: isTab,
    },
    {
      label: 'Emergency Contact Details',
      key: '3',
      children: (
        <ContactDetails
          closeModal={closeModal}
          setMaskClosable={setMaskClosable}
          formValues={formValues}
        />
      ),
      disabled: isTab2,
    },
  ];

  return <Tabs type='card' items={tabItems} activeKey={activeKey} onChange={onKeyChange} />;
};
export default TabContainer;
