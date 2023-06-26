import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChevronDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { logoutUser } from '../apis/constants/Api';
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';
import { getRole, toggelRole } from '../../redux/features/role/userRoleSlice';
import { useTokenData } from '../../hooks/userTokenData';
import { login, logout } from '../../features/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRoleData = useAppSelector(
    (state: RootState) => state.userRoleSlice
  );
  const currentRole = userRoleData.role === 'admin' ? 'user' : 'admin';
  const { isAdmin } = useTokenData();
  const logOut = () => {
    // localStorage.clear();
    // login();
    logoutUser();
  };
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      navigate('/profile');
    } else if (e.key === '2') {
      logOut();
    } else if (e.key === '3') {
      dispatch(toggelRole());
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1',
      icon: <UserOutlined onClick={() => logoutUser()} />,
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />,
    },
  ];

  if (isAdmin) {
    items.push({
      label: `View as ${currentRole}`,
      key: '3',
      icon: <SwapOutlined />,
    });
  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const [openDropdown, setOpenDropdown] = useState(true);
  const userDetails: any = localStorage.getItem('userDetails');
  const employeeDetails = JSON.parse(userDetails);
  const userName = employeeDetails?.employeeName;

  return (
    <div className='navbar-dash padding'>
      <div className='navbar-dash__left'>
        <div className='navbar-dash__left-search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize='14px' />
          <input type='text' placeholder='Search' />
        </div>
      </div>
      <div className='navbar-dash__right'>
        <FontAwesomeIcon icon={faBell} />

        <Dropdown menu={menuProps}>
          <Button type='text'>
            <Space>
              {userName}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
