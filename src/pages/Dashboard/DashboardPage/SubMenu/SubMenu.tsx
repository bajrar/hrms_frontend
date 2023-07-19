import React, { useEffect, useState } from 'react';
import './SubMenu.css';
import { Button, Skeleton, Tabs } from 'antd';
import { Graph } from '../Graph/Graph';
import { DashboardEmployeeStatus } from '../DashboardEmployeeStatus/DashboardEmployeeStatus';
import Analytics from '../Analytics/Analytics';
import AttendaceCount from '../../../../Components/Dashboard/AttendanceCount/AttendaceCount';
import EmployeeCountByDesignation from '../../../../Components/Dashboard/AttendanceCount/EmployeeCountByDesignation';
import UpcomingEvents from '../../../../Components/Dashboard/upcomingEvents/UpcomingEvents';
import Announcement from '../../../../Components/Dashboard/upcomingEvents/Announcement';
import UserDashboard from '../UserDashboard/UserDashboard';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import NepaliDate from 'nepali-date-converter';
import { MdCalendarToday } from 'react-icons/md';
import { useGetTokenDataQuery } from '../../../../redux/api/tokenSlice';
import { RootState } from '../../../../store';
import { useAppSelector } from '../../../../hooks/useTypedSelector';
import { getRole } from '../../../../redux/features/role/userRoleSlice';
import { useTokenData } from '../../../../hooks/userTokenData';

type SubMenuProps = {};

export const SubMenu = ({}: SubMenuProps) => {
  const dispatch = useDispatch();
  const { data: tokenData, isLoading } = useGetTokenDataQuery('token');
  const authData = useAppSelector((state: RootState) => state.userSlice.value);
  // const userRole = tokenData?.role;
  const userRole = authData?.role || tokenData?.role;
  useEffect(() => {
    dispatch(getRole(userRole));
  }, [userRole]);

  const userRoleData = useAppSelector((state: RootState) => state.userRoleSlice);
  const { isAdminTemp: isAdmin } = useTokenData();
  const operations = (
    <Button
      type="dashed"
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px',
      }}
    >
      {new NepaliDate().format('ddd DD, MMMM YYYY')} <MdCalendarToday />
    </Button>
  );

  if (!userRole) {
    return (
      <Spin
        size="large"
        style={{
          position: 'absolute',
          top: '50%',
          right: '50%',
        }}
      />
    );
  }
  return (
    <div className="hr-dashboard-sub-menu">
      <div className="row hr-dashboard-sub-menu-content">
        <>
          <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
            <Tabs.TabPane tab="Dashboard" key="1">
              {isAdmin ? (
                <>
                  <div className="row">
                    <div className="col-lg-6 hr-dashboard-sub-menu-content-left">
                      <Graph />
                      <DashboardEmployeeStatus />
                    </div>
                    <div className="col-lg-6">
                      <Analytics />
                      <AttendaceCount />
                      {/* <EmployeeCountByDesignation /> */}
                    </div>
                  </div>
                </>
              ) : (
                <UserDashboard />
              )}
            </Tabs.TabPane>

            {isAdmin && (
              <Tabs.TabPane tab="Upcoming events" key="2">
                <div className="dashboard-upcoming-events">
                  <div className="Upcoming col-8">
                    <UpcomingEvents />
                  </div>
                  <div className="announcement col-4">
                    <Announcement />
                  </div>
                </div>
              </Tabs.TabPane>
            )}
          </Tabs>
        </>
      </div>
    </div>
  );
};
