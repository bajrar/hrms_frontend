import React, { useEffect } from 'react';
import './SubMenu.css';
import { Button, Tabs } from 'antd';
import { Graph } from '../Graph/Graph';
import { DashboardEmployeeStatus } from '../DashboardEmployeeStatus/DashboardEmployeeStatus';
import Analytics from '../Analytics/Analytics';
import AttendaceCount from '../../../../Components/Dashboard/AttendanceCount/AttendaceCount';
import EmployeeCountByDesignation from '../../../../Components/Dashboard/AttendanceCount/EmployeeCountByDesignation';
import UpcomingEvents from '../../../../Components/Dashboard/upcomingEvents/UpcomingEvents';
import Announcement from '../../../../Components/Dashboard/upcomingEvents/Announcement';
import UserDashborad from '../UserDashborad';
import { useAppSelector } from '../../../../hooks/useTypedSelector';
import { RootState } from '../../../../store';
import { verifyTokenStatus } from '../../../../redux/features/verifyTokenSlice';
import { useDispatch } from 'react-redux';

type SubMenuProps = {};

export const SubMenu = ({}: SubMenuProps) => {
  const dispatch = useDispatch();
  // const userData = useAppSelector((state: RootState) => state.userSlice.value);
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, [dispatch]);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;
  // const userRole = tokenData?.role;

  return (
    <div className='hr-dashboard-sub-menu'>
      <div className='row hr-dashboard-sub-menu-content'>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Dashboard' key='1'>
            {userRole === 'admin' ? (
              <>
                <div className='row'>
                  <div className='col-lg-6 hr-dashboard-sub-menu-content-left'>
                    <Graph />
                    <DashboardEmployeeStatus />
                  </div>
                  <div className='col-lg-6'>
                    <Analytics />
                    <AttendaceCount />
                    {/* <EmployeeCountByDesignation /> */}
                  </div>
                </div>
              </>
            ) : (
              <UserDashborad />
            )}
          </Tabs.TabPane>
          {userRole === 'admin' && (
            <Tabs.TabPane tab='Upcoming events' key='2'>
              <div className='dashboard-upcoming-events'>
                <div className='Upcoming col-8'>
                  <UpcomingEvents />
                </div>
                <div className='announcement col-4'>
                  <Announcement />
                </div>
              </div>
            </Tabs.TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
};
