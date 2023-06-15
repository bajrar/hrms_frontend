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

type MenuItem = Required<MenuProps>['items'][number];

const isOpenSelector = (state: any) => state.sidebarSlice.isOpen;
const SideBarTab = () => {
  // const [smallSidebar, setSmallSidebar] = useState<boolean>(true);
  const smallSidebar = useAppSelector(isOpenSelector);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, []);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;
  const userSn = tokenData?.userSn;
  const navigate = useNavigate();
  const userAccess = ['Vacancy Management', 'Employee Management', 'v'];
  function getItem(
    label?: any,
    key?: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): any {
    if (userRole === 'admin' || !userAccess.includes(label))
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
    if (userRole === 'user' && routeTo === 'attendance') {
      navigate(`/${routeTo}/${userSn}`);
    } else {
      navigate(`/${routeTo}`);
    }
    // if (routeTo === 'attendance' && userSn) {
    //   navigate(`/${routeTo}/${userSn}`);
    // } else {
    //   navigate(`/${routeTo}`);
    // }
    // setSmallSidebar(!smallSidebar);
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
            Employee
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
        userRole==='admin'?  getItem(
          <div className='sidenav-link' onClick={() => closeSidebar('leave')}>
            Leave Allocation
          </div>,
          '3'
        ):
        getItem(
          <div className='sidenav-link' onClick={() => closeSidebar('request-leave')}>
            Request Leave
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
        true
          ? getItem(
              <div
                className='sidenav-link'
                onClick={() => closeSidebar('shift')}
              >
                Shift Schedule
              </div>,
              '8'
            )
          : null,
        userRole === 'admin'
          ? getItem(
              <div
                className='sidenav-link'
                onClick={() => closeSidebar('reports')}
              >
                Report
              </div>,
              '9'
            )
          : null,
        userRole === 'admin'
          ? getItem(
              <div
                className='sidenav-link'
                onClick={() => closeSidebar('device-manager')}
              >
                Device Manager
              </div>,
              '10'
            )
          : null,
      ]
    ),
  ];
  const itemss: MenuProps['items'] = [
    getItem(
      'v',
      'sub1',
      <div
        className='icons-container sidebar-icon'
        onClick={() => openSidebar()}
      >
        <img src='/images/employee.svg' alt='employee' />
      </div>
    ),

    getItem(
      '',
      'sub2',
      <div
        className='icons-container sidebar-icon'
        onClick={() => openSidebar()}
      >
        <img src='/images/leave.svg' alt='leave' />
      </div>
    ),

    getItem(
      'v',
      'sub3',
      <div
        className='icons-container sidebar-icon'
        onClick={() => openSidebar()}
      >
        <img src='/images/vacancy.svg' alt='vacancy' />
      </div>
    ),
    getItem(
      '',
      'sub4',
      <div
        className='icons-container sidebar-icon'
        onClick={() => openSidebar()}
      >
        <img src='/images/attendance.svg' alt='attendance' />
      </div>
    ),
  ];

  return (
    <div className='sidebar'>
      {smallSidebar ? (
        <div
          className='small-logo-container'
          onClick={() => navigate('/dashboard')}
        >
          <img src='/images/small-logo.svg' alt='Virtuosway Logo' />
        </div>
      ) : (
        <div className='logo-container' onClick={() => navigate('/dashboard')}>
          <img src='/images/virtuos-logo.svg' alt='virtuos logo' />
        </div>
      )}
      <div className='sidebar-nav'>
        <Menu
          mode='inline'
          items={smallSidebar ? itemss : items}
          className={
            smallSidebar ? 'sidebar-menus sidebar-menu-small' : 'sidebar-menus'
          }
        />
      </div>
    </div>
  );
};

export default SideBarTab;
