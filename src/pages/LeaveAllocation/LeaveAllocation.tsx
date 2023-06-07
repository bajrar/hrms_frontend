import { Tabs, TabsProps } from 'antd';
import AddLeave from '../../Components/LeaveAllocation/AddLeave';
import ApplyLeave from '../../Components/LeaveAllocation/ApplyLeave';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import './leaveAllocation.css';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';

const LeaveAllocation = () => {
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;
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
  const filteredItems =
    userRole === 'admin' ? items : items.filter((item) => item.key === '2');
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
        <Tabs defaultActiveKey='1' items={filteredItems} />
      </div>
    </Layout>
  );
};

export default LeaveAllocation;
