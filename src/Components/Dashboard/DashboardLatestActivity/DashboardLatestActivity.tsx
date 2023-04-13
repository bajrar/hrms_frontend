import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DashBoardLatestActivityTable } from './table';

type DashboardLatestActivityProps = {}

export const DashboardLatestActivity = ({}: DashboardLatestActivityProps) => (
  <div className="virtuosway-hr-dashboard-latest-activity">
    <div className="virtuosway-hr-dashboard-latest-activity-content container">
      <div className="row virtuosway-hr-dashboard-interview-title-section">
        <div className="col-sm-8 virtuosway-hr-dashboard-interview-content-title">
          <span>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            <text>LATEST ACTIVITY</text>
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
      <div>
        <DashBoardLatestActivityTable />
        <DashBoardLatestActivityTable />
        <DashBoardLatestActivityTable />
        <DashBoardLatestActivityTable />
        <DashBoardLatestActivityTable />
        <DashBoardLatestActivityTable />
      </div>
    </div>
  </div>
);