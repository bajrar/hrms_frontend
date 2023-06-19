import * as React from "react";
import "./DashboardEmployeeStatus.css";
import { Select, Space, Input, Table, Tag } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Search from "antd/es/input/Search";
import { DashboardEmployeeStatusTable } from "./DashboardEmployeeStatusTable";

type EmployeeStatusProps = {};
export const DashboardEmployeeStatus = ({}: EmployeeStatusProps) => {
  return (
    <div className="dashboard-employee-status">
      <div className="dashboard-employee-status-content">
        <div className="dashboard-employee-status-title">
          <span>Employee Status</span>
        </div>
        <div className="dashboard-employee-status-search-bar">
          <div className="row">
            <div className="col-lg-5">
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Select and filter by"
                options={[
                  { value: "employeeName", label: "Employee Name" },
                  { value: "status", label: "Status" },
                ]}
              />
            </div>
            <div className="col-lg-5 dashboard-employee-input-search-button">
              <Search placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="dashboard-employee-status-table">
          <DashboardEmployeeStatusTable />
        </div>
      </div>
    </div>
  );
};
