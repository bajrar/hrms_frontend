import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { LoginPage } from "../LoginPage/login";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { ProtectedRoute } from "./protectedRoute";
import { Leave } from "../Leave/leave";
import { Employee } from "../Employee";
import Attendance from "../../pages/Attendance/Attendance";
import Reports from "../../pages/Reports/Reports";
import EmployeeAttendance from "../../pages/Attendance/EmployeeAttendance";
import Shift from "../../pages/Shift/Shift";
import ShiftDetails from "../../pages/Shift/ShiftDetails";
import Holidays from "../../pages/Holidays/Holidays";
import LeaveAllocation from "../../pages/LeaveAllocation/LeaveAllocation";
import DeviceManager from "../../pages/DeviceManager/DeviceManager";
import JobSummary from "../../pages/JobSumary/JobSummary";
import Applicants from "../../pages/Applicants/Applicants";
import LeaveDetails from "../../pages/LeaveAllocation/LeaveDetails";
import { ForgetPassword } from "../LoginPage/ForgetPassword";
import { OtpSection } from "../LoginPage/OtpSection";
import { ChangePassword } from "../LoginPage/ChangePassword";
import AdminRouteHOC from "../../HOC/adminProtected";
import { ProtectedOtpRoute } from "./protectedOtp";

type MainRoutesProps = {};

export const MainRoutes = ({}: MainRoutesProps) => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/attendance/:employeeId"
            element={<EmployeeAttendance />}
          />
          <Route path="/shift" element={<Shift />} />
          <Route path="/shift/:shiftId" element={<ShiftDetails />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/leave-allocation" element={<LeaveAllocation />} />
          <Route path="/leave/:leaveId" element={<LeaveDetails />} />

          <Route path="/device-manager" element={<DeviceManager />} />
          {/* <Route path='/job-summary' element={<JobSummary />} /> */}
          <Route path="/job-summary" Component={AdminRouteHOC(JobSummary)} />
          <Route path="/applicants" element={<Applicants />} />
        </Route>
        <Route element={<ProtectedOtpRoute />}>
          <Route path="/verifyOtp" element={<OtpSection />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Route>
        <Route path="/forgotPassword" element={<ForgetPassword />} />
      </Routes>
    </React.Fragment>
  );
};
