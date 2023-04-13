import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import './navbar.css';
import { Link } from 'react-router-dom';

type DashboardNavbarProps = {};
const items: MenuProps['items'] = [
  {
    label: 'Submit and continue',
    key: '1',
  },
];

export const DashboardNavbar = ({}: DashboardNavbarProps) => (
  <div className='virtuosway-hr-dashboard-navbar'>
    <div className='virtuosway-hr-dashboard-navbar-content container'>
      <div className='row'>
        <div className='col-sm-6 virtuosway-hr-dasboard-navbar-title'>
          <span>Dashboard</span>
        </div>
        <div className='col-sm-6 virtuosway-hr-dasboard-navbar-button'>
          <span>
            <Space>
              <Dropdown.Button icon={<DownOutlined />} menu={{ items }}>
                <Link to='/applyjobs' style={{ textDecoration: 'none' }}>
                  Create a job
                </Link>
              </Dropdown.Button>
            </Space>
          </span>
        </div>
      </div>
    </div>
  </div>
);
