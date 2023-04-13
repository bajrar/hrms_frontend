import { Tabs, TabsProps } from 'antd';
import AddLeave from '../../Components/LeaveAllocation/AddLeave';
import ApplyLeave from '../../Components/LeaveAllocation/ApplyLeave';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import './leaveAllocation.css';

const LeaveAllocation = () => {
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
  );
};

export default LeaveAllocation;
