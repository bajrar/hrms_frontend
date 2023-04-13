import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChevronLeft,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-dash padding'>
      <div className='navbar-dash__left'>
        <div className='navbar-dash__left-back'>
          <FontAwesomeIcon icon={faChevronLeft} /> <p>Back</p>
        </div>
        <div className='navbar-dash__left-search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize='14px' />
          <input type='text' placeholder='Search' />
        </div>
      </div>
      <div className='navbar-dash__right'>
        <FontAwesomeIcon icon={faBell} />
        <div className='user-profile'>
          <img src='/images/user-profile.svg' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
