import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import ShiftsTab from '../../Components/Shifts/ShiftsTab';
import ShiftsMappingTab from '../../Components/Shifts/ShiftsMappingTab';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { useEffect } from 'react';
import { RootState } from '../../store';

const Shift = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, []);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);

  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);

  const items = [
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
  ].filter((item) =>
    userData?.role
      ? userData?.role
      : tokenData.role === 'admin' || item.key === '1'
  );
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
