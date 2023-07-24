import React, { useState } from 'react';
import './sidebartab.css';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { AiOutlineMenu } from 'react-icons/ai';
import { setClose, setOpen } from '../../redux/features/sidebarSlice';
import { useGetTokenDataQuery } from '../../redux/api/tokenSlice';
import { useTokenData } from '../../hooks/userTokenData';

type MenuItem = Required<MenuProps>['items'][number];

const isOpenSelector = (state: any) => state.sidebarSlice.isOpen;
const SideBarTab = () => {
  const smallSidebar = useAppSelector(isOpenSelector);

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(verifyTokenStatus() as any);
  // }, []);
  const { userSn, isAdminTemp: isAdmin } = useTokenData();
  const authData = useAppSelector((state: RootState) => state.userSlice.value);
  console.log({ userSn });
  const navigate = useNavigate();

  const userAccess = ['Vacancy Management', 'Employee Management', 'v', 'Performance Manangement'];
  function getItem(label?: any, key?: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): any {
    /* IF NOT ADMIN, CHECK USER ACCESS ON MENU ITEMS */
    if (isAdmin || !userAccess.includes(label))
      return {
        key,
        icon,
        children,
        label,
        type,
      } as MenuItem;
    else null as any;
  }

  // const openSidebar = () => {
  //   setSmallSidebar(!smallSidebar);
  // };

  const openSidebar = () => {
    if (smallSidebar) {
      dispatch(setClose());
    } else {
      dispatch(setOpen());
    }

    // Additional logic or side effects
  };
  const closeSidebar = (routeTo: string) => {
    if (!isAdmin && routeTo === 'attendance') {
      navigate(`/${routeTo}/${userSn}`);
    } else {
      navigate(`/${routeTo}`);
    }
  };

  const items: MenuProps['items'] = [
    getItem(
      'Employee Management',
      'sub1',
      <div className="icons-container" onClick={() => openSidebar()}>
        <img src="/images/employee.svg" alt="employee" />
      </div>,
      [
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('employee')}>
            Employee
          </div>,
          '1',
        ),
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('manageProjects')}>
            Manage Projects
          </div>,
          '1',
        ),
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('onboarding')}>
            Onboarding
          </div>,
          '1',
        ),
      ],
    ),

    getItem(
      'Leave Management',
      'sub2',
      <div className="icons-container" onClick={() => openSidebar()}>
        <img src="/images/leave.svg" alt="leave" />
      </div>,
      [
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('holidays')}>
            Holidays
          </div>,
          '2',
        ),
        isAdmin
          ? getItem(
              <div className="sidenav-link" onClick={() => closeSidebar('leave')}>
                Leave Allocation
              </div>,
              '3',
            )
          : getItem(
              <div className="sidenav-link" onClick={() => closeSidebar('request-leave')}>
                Request Leave
              </div>,
              '3',
            ),
        isAdmin
          ? getItem(
              <div className="sidenav-link" onClick={() => closeSidebar('leave-summary')}>
                Summary & Bookings
              </div>,
              '3',
            )
          : null,
      ],
    ),

    getItem(
      'Vacancy Management',
      'sub3',
      <div className="icons-container" onClick={() => openSidebar()}>
        <img src="/images/vacancy.svg" alt="vacancy" />
      </div>,
      [
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('job-summary')}>
            Job Summary
          </div>,
          '4',
        ),
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('applicants')}>
            Applicants
          </div>,
          '5',
        ),
      ],
    ),
    getItem(
      'Attendance / Shift Management',
      'sub4',
      <div className="icons-container" onClick={() => openSidebar()}>
        <img src="/images/attendance.svg" alt="attendance" />
      </div>,
      [
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('attendance')}>
            Attendance
          </div>,
          '7',
        ),
        true
          ? getItem(
              <div className="sidenav-link" onClick={() => closeSidebar('shift')}>
                Shift Schedule
              </div>,
              '8',
            )
          : null,
        isAdmin
          ? getItem(
              <div className="sidenav-link" onClick={() => closeSidebar('reports')}>
                Report
              </div>,
              '9',
            )
          : null,
        isAdmin
          ? getItem(
              <div className="sidenav-link" onClick={() => closeSidebar('device-manager')}>
                Device Manager
              </div>,
              '10',
            )
          : null,
      ],
    ),
    getItem(
      'Company Details',
      'sub5',
      <div className="icons-container" onClick={() => openSidebar()}>
        <img src="/images/office.svg" alt="company" />
      </div>,
      [
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('perks')}>
            Perks
          </div>,
          '12',
        ),
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('handbook')}>
            Handbook and policy
          </div>,
          '13',
        ),
      ],
    ),
    getItem(
      'Performance Manangement',
      'sub6',
      <div className="icons-container" onClick={() => openSidebar()}>
        <img src="/images/performance.svg" alt="company" />
      </div>,
      [
        getItem(
          <div className="sidenav-link" onClick={() => closeSidebar('manage-review')}>
            Manage Review
          </div>,
          '15',
        ),
      ],
    ),
  ];

  const itemss: MenuProps['items'] = [
    getItem(
      'v',
      'sub1',
      <div className="icons-container sidebar-icon" onClick={() => openSidebar()}>
        <img src="/images/employee.svg" alt="employee" />
      </div>,
    ),

    getItem(
      '',
      'sub2',
      <div className="icons-container sidebar-icon" onClick={() => openSidebar()}>
        <img src="/images/leave.svg" alt="leave" />
      </div>,
    ),

    getItem(
      'v',
      'sub3',
      <div className="icons-container sidebar-icon" onClick={() => openSidebar()}>
        <img src="/images/vacancy.svg" alt="vacancy" />
      </div>,
    ),
    getItem(
      '',
      'sub4',
      <div className="icons-container sidebar-icon" onClick={() => openSidebar()}>
        <img src="/images/attendance.svg" alt="attendance" />
      </div>,
    ),
    getItem(
      '',
      'sub5',
      <div className="icons-container sidebar-icon" onClick={() => openSidebar()}>
        <img src="/images/office.svg" alt="office" />
      </div>,
    ),
    getItem(
      '',
      'sub6',
      <div className="icons-container sidebar-icon" onClick={() => openSidebar()}>
        <img src="/images/performance.svg" alt="performance" />
      </div>,
    ),
  ];

  return (
    <div className="sidebar">
      {smallSidebar ? (
        <div className="small-logo-container" onClick={() => navigate('/')}>
          <img src="/images/small-logo.svg" alt="Virtuosway Logo" />
        </div>
      ) : (
        <div className="logo-container" onClick={() => navigate('/')}>
          <img src="/images/virtuos-logo.svg" alt="virtuos logo" />
        </div>
      )}
      <div className="sidebar-nav">
        <Menu
          mode="inline"
          items={smallSidebar ? itemss : items}
          className={smallSidebar ? 'sidebar-menus sidebar-menu-small' : 'sidebar-menus'}
        />
      </div>
    </div>
  );
};

export default SideBarTab;
