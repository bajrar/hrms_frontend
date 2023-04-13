import React from 'react';
import { MailOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './sidebar.css';

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

const items: MenuItem[] = [
  getItem('Homepage', '1', <PieChartOutlined />, [
    getItem('Dashboard', '2'),
    getItem('Add Jobs', '3'),
    getItem('All Jobs', '4'),
    getItem('Applicant', '5'),
  ]),
  getItem('Attendance', 'sub1', <MailOutlined />, [
    getItem('Leave Application', '6'),
    getItem('Attendance', '7'),
  ]),
];

export const Sidebar: React.FC = () => {
  return (
    <>
      <div className='admin-sidebar'>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          style={{ width: 256, height: '100vh' }}
          // theme="dark"
          items={items}
        />
      </div>
    </>
  );
};
