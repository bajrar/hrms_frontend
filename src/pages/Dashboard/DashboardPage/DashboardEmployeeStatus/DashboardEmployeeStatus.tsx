import "./DashboardEmployeeStatus.css";
import { DashboardEmployeeStatusTable } from "./DashboardEmployeeStatusTable";


type EmployeeStatusProps = {};
export const DashboardEmployeeStatus = ({}: EmployeeStatusProps) => {

  return (
    <div className="dashboard-employee-status">
      <div className="dashboard-employee-status-content">
        <div className="dashboard-employee-status-title">
          <span>Employee Status</span>
        </div>
{/* yaha */}
        <div className="dashboard-employee-status-table">
          <DashboardEmployeeStatusTable />
        </div>
      </div>
    </div>
  );
};
