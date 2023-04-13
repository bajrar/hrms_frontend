import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import './DashboardInterview.css'

type DashboardInterviewProps = {}

export const DashboardInterview = ({}: DashboardInterviewProps) => (
  <div className="virtuosway-hr-dashboard-interview">
    <div className="virtuosway-hr-dashboard-interview-content ">
      <div className="row virtuosway-hr-dashboard-interview-title-section">
        <div className="col-sm-8 virtuosway-hr-dashboard-interview-content-title">
          <span>
            <span>
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <text>MY INTERVIEWS</text>
          </span>
        </div>
        <div className="col-sm-4  virtuosway-hr-dashboard-interview-title-section-icon">
          <span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className="virtuosway-hr-dashboard-interview-title-icon"
            />
          </span>
        </div>
      </div>
      <div className="row virtuosway-hr-dashboard-interview-body-section">
        <div className="virtuosway-hr-dashboard-interview-body-content">
          <p>
            <span className="virtuosway-hr-dashboard-interview-body-content-icon">
              <FontAwesomeIcon icon={faMessage} />
            </span>
          </p>
          <p>
            <span className="virtuosway-hr-dashboard-interview-body-content-text">
              Access interview guides for scheduled interviews.
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);