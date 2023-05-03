import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import ShiftsTab from '../../Components/Shifts/ShiftsTab';
import ShiftsMappingTab from '../../Components/Shifts/ShiftsMappingTab';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Shifts`,
    children: <ShiftsTab />,
  },
  {
    key: '2',
    label: `Shifts Mapping`,
    children: <ShiftsMappingTab />,
  },
];

const Shift = () => {
  return (
    <Layout>
      <Navbar />
      <div className='padding'>
        <hr />
        <BreadCrumbs
          classNames='padding'
          imagesrc='/images/attendance.svg'
          location='Attendance / Shift Management'
          location1='Shift schedule'
          location2='Shifts'
        />
        <hr />
        <Tabs defaultActiveKey='1' items={items} />
      </div>
    </Layout>
  );
};

export default Shift;
