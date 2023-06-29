import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import attendanceSlice from './redux/features/attendanceSlice';
import attendanceStatusSlice from './redux/features/attendanceStatusSlice';
import shiftSlice from './redux/features/shiftSlice';
import singleShiftSlice from './redux/features/singleShiftSlice';
import SingleAttendanceSlice from './redux/features/SingleAttendanceSlice';
import addedDeviceSlice from './redux/features/addedDeviceSlice';
import getJobsSlice from './redux/features/getJobsSlice';
import getSingleJobSlice from './redux/features/singleJobSlice';
import applicantSlice from './redux/features/applicantsSlice';
import singleApplicantSlice from './redux/features/singleApplicantSlice';
import leaveSlice from './redux/features/leaveSlice';
import singleLeaveSlice from './redux/features/singleLeaveSlice';
import monthlyReportSlice from './redux/features/monthlySlice';
import employeeSlice from './redux/features/employeeSlice';
import singleEmployeeSlice from './redux/features/singleEmployeeSlice';
import announcementSlice from './redux/features/announcementSlice';
import upcomingEventSlice from './redux/features/upcomingEvents';
import userSlice from './redux/features/userSlice';
import verifyTokenSlice from './redux/features/verifyTokenSlice';
import { attendanceRequestSlice } from './redux/features/attendanceUpdateSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { profileSlice } from './redux/features/profileSlice';
import { leaveSliceApi } from './redux/api/leaveSlice';
import { attendanceByDateApi } from './redux/api/attendanceByDateSlice';
import { employeeWorkhourSliceApi } from './redux/api/employeeWorkhour';
import sidebarSlice from './redux/features/sidebarSlice';
import { projectTeamSlice } from './redux/features/projectTeam.slice';
import { employeeApi } from './redux/api/employeeApiSlice';
import { tokenSliceApi } from './redux/api/tokenSlice';
import { applicantApiSlice } from './redux/api/applicantApiSlice';
import userRoleSlice from './redux/features/role/userRoleSlice';
import { announceSliceApi } from './redux/api/announceSliceApi';
import { holidayApiSlice } from './redux/api/holidays/holidayApiSlice';
import { eventSliceApi } from './redux/api/eventSliceApi';
import { dashboardSliceApi } from './redux/api/dashboard/dashboardSliceApi';

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    attendanceSlice: attendanceSlice,
    SingleAttendanceSlice: SingleAttendanceSlice,
    attendanceStatusSlice: attendanceStatusSlice,
    shiftSlice: shiftSlice,
    singleShiftSlice: singleShiftSlice,
    deviceSlice: addedDeviceSlice,
    jobsSlice: getJobsSlice,
    singleJobSlice: getSingleJobSlice,
    applicantSlice: applicantSlice,
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
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(attendanceRequestSlice.middleware).concat(profileSlice.middleware),
    getDefaultMiddleware().concat([
      attendanceRequestSlice.middleware,
      profileSlice.middleware,
      leaveSliceApi.middleware,
      employeeWorkhourSliceApi.middleware,
      attendanceByDateApi.middleware,
      projectTeamSlice.middleware,
      tokenSliceApi.middleware,
      employeeApi.middleware,
      applicantApiSlice.middleware,
      announceSliceApi.middleware,
      holidayApiSlice.middleware,
      eventSliceApi.middleware,
      dashboardSliceApi.middleware
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
