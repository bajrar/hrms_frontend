import React, { useState } from 'react';
import './sidebartab.css';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label?: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideBarTab = () => {
  const [smallSidebar, setSmallSidebar] = useState<boolean>(true);
  const navigate = useNavigate();

  const openSidebar = () => {
    setSmallSidebar(!smallSidebar);
  };
  const closeSidebar = (routeTo: string) => {
    navigate(`/${routeTo}`);
    setSmallSidebar(!smallSidebar);
  };

  const items: MenuProps['items'] = [
    getItem(
      'Employee Management',
      'sub1',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/employee.svg' alt='employee' />
      </div>,
      [
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('employee')}
          >
            Add Employee
          </div>,
          '1'
        ),
      ]
    ),

    getItem(
      'Leave Management',
      'sub2',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/leave.svg' alt='leave' />
      </div>,
      [
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('holidays')}
          >
            Holidays
          </div>,
          '2'
        ),
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('leave-allocation')}
          >
            Leave Allocation
          </div>,
          '3'
        ),
      ]
    ),

    getItem(
      'Vacancy Management',
      'sub3',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/vacancy.svg' alt='vacancy' />
      </div>,
      [
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('job-summary')}
          >
            Job Summary
          </div>,
          '4'
        ),
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('applicants')}
          >
            Applicants
          </div>,
          '5'
        ),
      ]
    ),
    getItem(
      'Attendance / Shift Management',
      'sub4',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/attendance.svg' alt='attendance' />
      </div>,
      [
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('attendance')}
          >
            Attendance
          </div>,
          '7'
        ),
        getItem(
          <div className='sidenav-link' onClick={() => closeSidebar('shift')}>
            Shift Schedule
          </div>,
          '8'
        ),
        getItem(
          <div className='sidenav-link' onClick={() => closeSidebar('reports')}>
            Report
          </div>,
          '9'
        ),
        getItem(
          <div
            className='sidenav-link'
            onClick={() => closeSidebar('device-manager')}
          >
            Device Manager
          </div>,
          '10'
        ),
      ]
    ),
  ];
  const itemss: MenuProps['items'] = [
    getItem(
      '',
      'sub1',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/employee.svg' alt='employee' />
      </div>
    ),

    getItem(
      '',
      'sub2',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/leave.svg' alt='leave' />
      </div>
    ),

    getItem(
      '',
      'sub3',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/vacancy.svg' alt='vacancy' />
      </div>
    ),
    getItem(
      '',
      'sub4',
      <div className='icons-container' onClick={() => openSidebar()}>
        <img src='/images/attendance.svg' alt='attendance' />
      </div>
    ),
  ];
  return (
    <div className='sidebar'>
      {smallSidebar ? (
        <div className='small-logo-container' onClick={() => navigate('/')}>
          <img src='/images/small-logo.svg' alt='virtuos logo' />
        </div>
      ) : (
        <div className='logo-container' onClick={() => navigate('/')}>
          <img src='/images/virtuos-logo.svg' alt='virtuos logo' />
        </div>
      )}
      <div className='sidebar-nav'>
        <Menu
          mode='inline'
          items={smallSidebar ? itemss : items}
          className='sidebar-menus'
        />
      </div>
    </div>
  );
};

export default SideBarTab;
