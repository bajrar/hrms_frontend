import React from 'react';
import './sidebartab.css';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
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
const items: MenuProps['items'] = [
  getItem(
    'Employee Management',
    'sub1',
    <div className='icons-container'>
      <img src='/images/employee.svg' alt='employee' />
    </div>,
    [
      getItem(
        <Link className='sidenav-link' to='/employee'>
          Add Employee
        </Link>,
        '1'
      ),
    ]
  ),

  getItem(
    'Leave Management',
    'sub2',
    <div className='icons-container'>
      <img src='/images/leave.svg' alt='leave' />
    </div>,
    [
      getItem(
        <Link className='sidenav-link' to='/holidays'>
          Holidays
        </Link>,
        '2'
      ),
      getItem(
        <Link className='sidenav-link' to='/leave-allocation'>
          Leave Allocation
        </Link>,
        '3'
      ),
    ]
  ),

  getItem(
    'Vacancy Management',
    'sub3',
    <div className='icons-container'>
      <img src='/images/vacancy.svg' alt='vacancy' />
    </div>,
    [
      getItem(
        <Link className='sidenav-link' to='/job-summary'>
          Job Summary
        </Link>,
        '4'
      ),
      getItem(
        <Link className='sidenav-link' to='/applicants'>
          Applicants
        </Link>,
        '5'
      ),
    ]
  ),
  getItem(
    'Attendance / Shift Management',
    'sub4',
    <div className='icons-container'>
      <img src='/images/attendance.svg' alt='attendance' />
    </div>,
    [
      getItem(
        <Link className='sidenav-link' to='/attendance'>
          Attendance
        </Link>,
        '7'
      ),
      getItem(
        <Link className='sidenav-link' to='/shift'>
          Shift Schedule
        </Link>,
        '8'
      ),
      getItem(
        <Link className='sidenav-link' to='/reports'>
          Report
        </Link>,
        '9'
      ),
      getItem(
        <Link className='sidenav-link' to='/device-manager'>
          Device Manager
        </Link>,
        '9'
      ),
    ]
  ),
];

const SideBarTab = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebar'>
      <div className='logo-container' onClick={() => navigate('/')}>
        <img src='/images/virtuos-logo.svg' alt='virtuos logo' />
      </div>
      <div className='sidebar-nav'>
        <Menu mode='inline' items={items} className='sidebar-menus' />
      </div>
    </div>
  );
};

export default SideBarTab;
