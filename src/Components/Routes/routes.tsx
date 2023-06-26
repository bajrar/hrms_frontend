import React, { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { LoginPage } from '../LoginPage/login';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { ProtectedRoute } from './protectedRoute';
import { Leave } from '../Leave/leave';
import { Employee } from '../Employee';
import Attendance from '../../pages/Attendance/Attendance';
import Reports from '../../pages/Reports/Reports';
import EmployeeAttendance from '../../pages/Attendance/EmployeeAttendance';
import Shift from '../../pages/Shift/Shift';
import ShiftDetails from '../../pages/Shift/ShiftDetails';
import Holidays from '../../pages/Holidays/Holidays';
import LeaveAllocation from '../../pages/LeaveAllocation/LeaveAllocation';
import DeviceManager from '../../pages/DeviceManager/DeviceManager';
import JobSummary from '../../pages/JobSumary/JobSummary';
import Applicants from '../../pages/Applicants/Applicants';
import LeaveDetails from '../../pages/LeaveAllocation/LeaveDetails';
import { ForgetPassword } from '../LoginPage/ForgetPassword';
import { OtpSection } from '../LoginPage/OtpSection';
import { ChangePassword } from '../LoginPage/ChangePassword';
import Profile from '../../pages/Profile/Profile';
import AdminRouteHOC from '../../HOC/adminProtected';
import { ProtectedOtpRoute } from './protectedOtp';
import { AdminProtectedRoute } from './adminProtected';
import RequestLeave from '../Leave/RequestLeave';
import EmpDetails from '../Employee/EmployeeDetails';
import ManageProjects from '../Employee/ManageProjects/ManageProjects';
import ViewManage from '../Employee/ManageProjects/ViewManage';

type MainRoutesProps = {};

export const MainRoutes = ({}: MainRoutesProps) => {
  return (
    <React.Fragment>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/holidays' element={<Holidays />} />
          <Route path='/leave' element={<LeaveAllocation />} />
          <Route path='/request-leave' element={<RequestLeave />} />
          <Route
            path='/attendance/:employeeId'
            element={<EmployeeAttendance />}
          />
          <Route
            path='/attendance/:employeeId'
            element={<EmployeeAttendance />}
          />
          <Route path='/shift' element={<Shift />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path='/shift/:shiftId' element={<ShiftDetails />} />
            <Route path='/leave/:leaveId' element={<LeaveDetails />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/device-manager' element={<DeviceManager />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/manageProjects' element={<ManageProjects />} />
            <Route path='/employee/:empId' element={<EmpDetails />} />
            <Route path='/manageProjects/:empId' element={<ViewManage />} />
            <Route path='/job-summary' element={<JobSummary />} />
            <Route path='/applicants' element={<Applicants />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/reports' element={<Reports />} />
          </Route>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<ProtectedOtpRoute />}>
          <Route path='/verifyOtp' element={<OtpSection />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
        </Route>
        <Route path='/forgotPassword' element={<ForgetPassword />} />
      </Routes>
    </React.Fragment>
  );
};
