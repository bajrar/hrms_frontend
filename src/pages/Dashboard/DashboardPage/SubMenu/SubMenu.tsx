import React from 'react';
import './SubMenu.css';
import { Tabs } from 'antd';
import { Graph } from '../Graph/Graph';
import { DashboardEmployeeStatus } from '../DashboardEmployeeStatus/DashboardEmployeeStatus';
import Analytics from '../Analytics/Analytics';
import AttendaceCount from '../../../../Components/Dashboard/AttendanceCount/AttendaceCount';

type SubMenuProps = {};

export const SubMenu = ({}: SubMenuProps) => {
  return (
    <div className='hr-dashboard-sub-menu'>
      <div className='row hr-dashboard-sub-menu-content'>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Dashboard' key='1'>
            <div className='row'>
              <div className='col-lg-6 hr-dashboard-sub-menu-content-left'>
                <Graph />
                <DashboardEmployeeStatus />
              </div>
              <div className='col-lg-6'>
                <Analytics />
                <AttendaceCount />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Upcoming events' key='2'>
            Content of Review
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
