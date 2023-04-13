import { useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SideBarTab from '../Layout/SidebarTab';

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const OpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <div className='virtuosway-hr-header'>
      <div className='virtuosway-hr-header-content container'>
        <div className='row m-0 align-items-center space-between w-100'>
          <div className='col-sm-2 virtuosway-hr-title'>
            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
              <span>VirtuoswayHR</span>
            </Link>
          </div>
          <div
            className='col-sm-10 d-flex flex-row-reverse p-inline-0'
            onClick={() => OpenMenu()}
          >
            <FontAwesomeIcon icon={faBars} color='#ffffff' />
          </div>
          {/* <div className="col-sm-5 virtuosway-hr-header-list-part-one">
            <ul>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <li>Dashboard</li>
              </Link>
    
              <Link to="/applyjobs" style={{ textDecoration: "none" }}>
                <li>Add Jobs</li>
              </Link>
              <Link to="/alljobs" style={{ textDecoration: "none" }}>
                <li>All jobs</li>
              </Link>
              <Link to="/viewapplicant" style={{ textDecoration: "none" }}>
                <li>Applicants</li>
              </Link>
    
    
            </ul>
          </div>
          <div className="col-sm-5 virtuosway-hr-header-list-part-two">
            <ul>
              <li>
                <FontAwesomeIcon
                  icon={faEye}
                  className="virtuosway-hr-header-icon"
                />
                <span>0</span>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="virtuosway-hr-header-icon"
                />
                <span>0</span>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="virtuosway-hr-header-icon"
                />
                <span>Search</span>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="virtuosway-hr-header-icon"
                />
                <span>RR</span>
              </li>
            </ul>
          </div> */}

          {openMenu ? <SideBarTab /> : null}
        </div>
      </div>
    </div>
  );
};
