import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard/Dashboard'
import { LoginPage } from '../LoginPage/login'
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { Applyjobs } from '../ApplyJobs/applyjobs'
import { Alljobs } from '../AllJobs/alljobs'
import { Viewjobs } from '../ViewJobs/viewjob'
import { ViewApplicant } from '../ViewApplicant/viewApplicant'
import { UpdateJobMain } from '../ApplyJobs/UpdateJob/updatejobmain'
import { ViewApplicantmain } from '../ViewApplicant/viewApplicantmain'
import { Homepage } from '../Homepage/homepage'
import { ProtectedRoute } from './protectedRoute'
import { Leave } from '../Leave/leave'
import { AsignShift } from '../AsignShift/AsignShift'

import Employee from '../Employee'
import { AddUserDevice } from '../AddUSerInDevice/AddUserDevice'
import { BigCalendar } from '../Calendar/Calendar'
import Attendance from '../../pages/Attendance/Attendance'
import Reports from '../../pages/Reports/Reports'
import { EmployeeAttenadanceRecord } from '../EmployeeAttenadanceRecord/EmployeeAttenadanceRecord'
import EmployeeAttendance from '../../pages/Attendance/EmployeeAttendance'
import Shift from '../../pages/Shift/Shift'
import ShiftDetails from '../../pages/Shift/ShiftDetails'
import Holidays from '../../pages/Holidays/Holidays'
import LeaveAllocation from '../../pages/LeaveAllocation/LeaveAllocation'
import DeviceManager from '../../pages/DeviceManager/DeviceManager'
import JobSummary from '../../pages/JobSumary/JobSummary'
import Applicants from '../../pages/Applicants/Applicants'
import LeaveDetails from '../../pages/LeaveAllocation/LeaveDetails'

type MainRoutesProps = {}

export const MainRoutes = ({}: MainRoutesProps) => {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/applyjobs' element={<Applyjobs />} />
          <Route path='/alljobs' element={<Alljobs />} />
          <Route path='/viewapplicant' element={<ViewApplicant />} />
          <Route path='/leave' element={<Leave />} />
          <Route path='/asignshift' element={<AsignShift />} />
          <Route
            path='/viewapplicantmain/:id'
            element={<ViewApplicantmain />}
          />
          <Route path='/aboutjob/:id' element={<Viewjobs />} />
          <Route path='/updatejob/:id' element={<UpdateJobMain />} />
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/addUserInDevice' element={<AddUserDevice />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/reports' element={<Reports />} />

          <Route path='/addUserInDevice' element={<AddUserDevice />} />
          <Route path='/calendar' element={<BigCalendar />} />
          <Route
            path='/EmployeeAttenadanceRecord'
            element={<EmployeeAttenadanceRecord />}
          />
          <Route
            path='/attendance/:employeeId'
            element={<EmployeeAttendance />}
          />
          <Route path='/shift' element={<Shift />} />
          <Route path='/shift/:shiftId' element={<ShiftDetails />} />
          <Route path='/holidays' element={<Holidays />} />
          <Route path='/leave-allocation' element={<LeaveAllocation />} />
          <Route path='/leave/:leaveId' element={<LeaveDetails />} />

          <Route path='/device-manager' element={<DeviceManager />} />
          <Route path='/job-summary' element={<JobSummary />} />
          <Route path='/applicants' element={<Applicants />} />
        </Route>

        <Route path='/' element={<LoginPage />} />
      </Routes>
    </React.Fragment>
  )
}
