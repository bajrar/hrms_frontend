import React from 'react';
import './DashboardSubMenu.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase ,faUser, faArrowRight,faMessage,faFile,faThumbsUp} from "@fortawesome/free-solid-svg-icons";


type DashboardSubMenuProps = {}

export const DashboardSubMenu = ({}: DashboardSubMenuProps) => (
  <div className="virtuosway-hr-sub-menu">
    <div className="virtuosway-hr-sub-menu-content container">
      <div>
        <ul>
          <li>LAST 7 DAYS</li>
          <li>
            <span className="virtuosway-hr-dashboard-submenu-icon">
              <FontAwesomeIcon icon={faSuitcase} />
            </span>
            <span>0 jobs opened</span>
          </li>
          <li>
            <span className="virtuosway-hr-dashboard-submenu-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span>12 new candidates</span>
          </li>
          <li>
            <span className="virtuosway-hr-dashboard-submenu-icon">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            <span>0 candidates advanced</span>
          </li>
          <li>
            <span className="virtuosway-hr-dashboard-submenu-icon">
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <span>0 onterview completed</span>
          </li>
          <li>
            <span className="virtuosway-hr-dashboard-submenu-icon">
              <FontAwesomeIcon icon={faFile} />
            </span>
            <span>0 offers sent</span>
          </li>
          <li>
            <span className="virtuosway-hr-dashboard-submenu-icon">
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
            <span>0 hires made</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);