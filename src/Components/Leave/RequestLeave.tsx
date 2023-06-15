import { Tabs, TabsProps } from 'antd';
import AddLeave from '../../Components/LeaveAllocation/AddLeave';
import ApplyLeave from '../../Components/LeaveAllocation/ApplyLeave';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
// import './leaveAllocation.css';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';

const RequestLeave = () => {
    const userDetails = localStorage.getItem('userDetails')
    const employeeDetails = JSON.parse(userDetails || '')
    console.log("🚀 ~ file: RequestLeave.tsx:12 ~ RequestLeave ~ employeeDetails:", employeeDetails?.leave)
    
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Apply Leave`,
      children: <ApplyLeave />,
    },
  ];
  return (
    <Layout>
      <Navbar />
      <div className='leave-allocation padding'>
        <hr />
        <BreadCrumbs
          imagesrc='/images/leave.svg'
          location='Leave Management'
          location1='Leave Allocation'
          location2='Add Leave'
        />
        <hr />
        <Tabs defaultActiveKey='1' items={items} />
      </div>
    </Layout>
  );
};

export default RequestLeave;
