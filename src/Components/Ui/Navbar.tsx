import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChevronDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { logoutUser } from '../apis/constants/Api';
import { token } from '../apis/constants/ApisService';
import { Button, MenuProps } from 'antd';
import { useState } from 'react';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(true);
  const email = localStorage.getItem('email');

  const items: MenuProps['items'] = [];

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
        {email ? (
          <p onClick={() => setOpenDropdown(!openDropdown)}>
            {email} <FontAwesomeIcon icon={faChevronDown} />
          </p>
        ) : null}

        <div
          className={
            openDropdown ? `custom-dropdown-active` : `custom-dropdown`
          }
        >
          {token === null ? null : (
            <Button
              type="text"
              style={{
                // background: "#00b9f1",
                border: "2px solid #051a63",
              }}
              onClick={() => logoutUser()}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
