
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import attendanceSlice from "./features/attendanceSlice";
import SingleAttendanceSlice from "./features/SingleAttendanceSlice";
import shiftSlice from "./features/shiftSlice";
import singleShiftSlice from "./features/singleShiftSlice";
import addedDeviceSlice from "./features/addedDeviceSlice";
import getJobsSlice from "./features/getJobsSlice";
import applicantsSlice from "./features/applicantsSlice";
import singleApplicantSlice from "./features/singleApplicantSlice";
import leaveSlice from "./features/leaveSlice";
import singleLeaveSlice from "./features/singleLeaveSlice";
import { announceSliceApi } from "./api/announceSliceApi";
import { applicantApiSlice } from "./api/applicantApiSlice";
import { attendanceByDateApi } from "./api/attendanceByDateSlice";
import { dashboardSliceApi } from "./api/dashboard/dashboardSliceApi";
import { employeeApi } from "./api/employeeApiSlice";
import { employeeWorkhourSliceApi } from "./api/employeeWorkhour";
import { eventSliceApi } from "./api/eventSliceApi";
import { holidayApiSlice } from "./api/holidays/holidayApiSlice";
import { leaveSliceApi } from "./api/leaveSlice";
import { reportApiSlice } from "./api/report/reportApiSlice";
import { tokenSliceApi } from "./api/tokenSlice";
import announcementSlice from "./features/announcementSlice";
import { attendanceRequestSlice } from "./features/attendanceUpdateSlice";
import employeeSlice from "./features/employeeSlice";
import { profileSlice } from "./features/profileSlice";
import { projectTeamSlice } from "./features/projectTeam.slice";
import userRoleSlice from "./features/role/userRoleSlice";
import sidebarSlice from "./features/sidebarSlice";
import singleEmployeeSlice from "./features/singleEmployeeSlice";
import userSlice from "./features/userSlice";
import verifyTokenSlice from "./features/verifyTokenSlice";
import getSingleJobSlice from './features/singleJobSlice'
import upcomingEventSlice from './features/upcomingEvents'
import monthlyReportSlice from './features/monthlySlice'
import { shiftApiSlice } from "./api/shift/shiftApiSlice";
export const rootReducer = combineReducers({
    authSlice: authSlice,
    // attendanceSlice: attendanceSlice,
    // SingleAttendanceSlice: SingleAttendanceSlice,
    // attendanceStatusSlice: attendanceStatusSlice,
    // shiftSlice: shiftSlice,
    // singleShiftSlice: singleShiftSlice,
    deviceSlice: addedDeviceSlice,
    jobsSlice: getJobsSlice,
    singleJobSlice: getSingleJobSlice,
    applicantSlice: applicantsSlice,
    singleApplicantSlice: singleApplicantSlice,
    leaveSlice: leaveSlice,
    singleLeave: singleLeaveSlice,
    monthlyReport: monthlyReportSlice,
    employeeSlice: employeeSlice,
    singleEmployeeSlice: singleEmployeeSlice,
    announcement: announcementSlice,
    upcomingEvents: upcomingEventSlice,
    userSlice: userSlice,
    verifyTokenSlice: verifyTokenSlice,
    sidebarSlice: sidebarSlice,
    userRoleSlice: userRoleSlice,
    [attendanceRequestSlice.reducerPath]: attendanceRequestSlice.reducer,
    [profileSlice.reducerPath]: profileSlice.reducer,
    [leaveSliceApi.reducerPath]: leaveSliceApi.reducer,
    [attendanceByDateApi.reducerPath]: attendanceByDateApi.reducer,
    [employeeWorkhourSliceApi.reducerPath]: employeeWorkhourSliceApi.reducer,
    [projectTeamSlice.reducerPath]: projectTeamSlice.reducer,
    [tokenSliceApi.reducerPath]: tokenSliceApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [applicantApiSlice.reducerPath]: applicantApiSlice.reducer,
    [announceSliceApi.reducerPath]: announceSliceApi.reducer,
    [holidayApiSlice.reducerPath]: holidayApiSlice.reducer,
    [eventSliceApi.reducerPath]: eventSliceApi.reducer,
    [dashboardSliceApi.reducerPath]: dashboardSliceApi.reducer,
    [reportApiSlice.reducerPath]: reportApiSlice.reducer,
    [shiftApiSlice.reducerPath]: shiftApiSlice.reducer,
  })