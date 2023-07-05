import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Applicants from '../../pages/Applicants/Applicants';
import Attendance from '../../pages/Attendance/Attendance';
import EmployeeAttendance from '../../pages/Attendance/EmployeeAttendance';
import Dashboard from '../../pages/Dashboard/Dashboard';
import DeviceManager from '../../pages/DeviceManager/DeviceManager';
import Holidays from '../../pages/Holidays/Holidays';
import JobSummary from '../../pages/JobSumary/JobSummary';
import LeaveAllocation from '../../pages/LeaveAllocation/LeaveAllocation';
import LeaveDetails from '../../pages/LeaveAllocation/LeaveDetails';
import Onboarding from '../../pages/Onboarding';
import Profile from '../../pages/Profile/Profile';
import Reports from '../../pages/Reports/Reports';
import Shift from '../../pages/Shift/Shift';
import ShiftDetails from '../../pages/Shift/ShiftDetails';
import { Employee } from '../Employee';
import EmpDetails from '../Employee/EmployeeDetails';
import ManageProjects from '../Employee/ManageProjects/ManageProjects';
import ViewManage from '../Employee/ManageProjects/ViewManage';
import RequestLeave from '../Leave/RequestLeave';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { AdminProtectedRoute } from './adminProtected';
import { ProtectedOtpRoute } from './protectedOtp';
import { OtpSection } from '../LoginPage/OtpSection';
import { ChangePassword } from '../LoginPage/ChangePassword';

type MainRoutesProps = {};

export const MainRoutes = ({}: MainRoutesProps) => {
  return (
    <React.Fragment>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}

        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/leave" element={<LeaveAllocation />} />
        <Route path="/request-leave" element={<RequestLeave />} />
        <Route path="/attendance/:employeeId" element={<EmployeeAttendance />} />
        <Route path="/shift" element={<Shift />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/shift/:shiftId" element={<ShiftDetails />} />
          <Route path="/leave/:leaveId" element={<LeaveDetails />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/device-manager" element={<DeviceManager />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/manageProjects" element={<ManageProjects />} />
          <Route path="/employee/:empId" element={<EmpDetails />} />
          <Route path="/manageProjects/:empId" element={<ViewManage />} />
          <Route path="/job-summary" element={<JobSummary />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        {/* </Route> */}
        <Route element={<ProtectedOtpRoute />}>
          <Route path="/verifyOtp" element={<OtpSection />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};
