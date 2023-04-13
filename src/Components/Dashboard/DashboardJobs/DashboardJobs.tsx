import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import './DashboardJobs.css'

type DashboardJobsProps = {}

export const DashboardJobs = ({}: DashboardJobsProps) => (
  <div className="virtuosway-hr-dashboard-jobs">
    <div className="virtuosway-hr-dashboard-jobs-content ">
      <div className="row virtuosway-hr-dashboard-jobs-title-section">
        <div className="col-sm-8 virtuosway-hr-dashboard-jobs-content-title">
          <span>
            <span>
              <FontAwesomeIcon icon={faSuitcase} />
            </span>
            <text>MY OPEN JOBS</text>
          </span>
        </div>
        <div className="col-sm-4  virtuosway-hr-dashboard-jobs-title-section-icon">
          <span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className="virtuosway-hr-dashboard-jobs-title-icon"
            />
          </span>
        </div>
      </div>
      <div className="row virtuosway-hr-dashboard-jobs-body-section">
        <div className="virtuosway-hr-dashboard-jobs-body-content">
          <p>
            <span className="virtuosway-hr-dashboard-jobs-body-content-icon">
              <FontAwesomeIcon icon={faSuitcase} />
            </span>
          </p>
          <p>
            <span className="virtuosway-hr-dashboard-jobs-body-content-text">
              View your open jobs here.
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);