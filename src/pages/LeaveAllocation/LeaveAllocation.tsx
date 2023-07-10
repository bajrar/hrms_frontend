import { Tabs, TabsProps } from 'antd';
import AddLeave from '../../Components/LeaveAllocation/AddLeave';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import './leaveAllocation.css';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { useEffect, useState } from 'react';
import ApplyLeave from '../../Components/LeaveAllocation/ApplyLeave';
import { useTokenData } from '../../hooks/userTokenData';
import { useNavigate } from 'react-router-dom';

const LeaveAllocation = () => {
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const { isAdminTemp } = useTokenData();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const getBreadcrumbsLocation2 = () => {
    if (activeTab === '1') {
      return 'Add Leave';
    } else if (activeTab === '2') {
      return 'Apply Leave';
    }
    return '';
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Add Leave`,
      children: <AddLeave />,
    },
    {
      key: '2',
      label: `Apply Leave`,
      children: <ApplyLeave />,
    },
  ];

  return (
    <div className="leave-allocation padding">
      <hr />
      <BreadCrumbs
        imagesrc="/images/leave.svg"
        location="Leave Management"
        location1="Leave Allocation"
        location2={getBreadcrumbsLocation2()}
      />
      <hr />
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </div>
  );
};

export default LeaveAllocation;
