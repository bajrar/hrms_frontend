import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChevronDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { logoutUser } from '../apis/constants/Api';
import { token } from '../apis/constants/ApisService';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';

const handleMenuClick: MenuProps['onClick'] = (e) => {
  if (e.key === '1') {
    console.log('profile');
  } else if (e.key === '2') {
    logoutUser();
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

const menuProps = {
  items,
  onClick: handleMenuClick,
};
const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(true);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const userName = userData?.userName;
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
