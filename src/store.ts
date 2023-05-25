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
import holidaySlice from './redux/features/holidaysSlice';
import leaveSlice from './redux/features/leaveSlice';
import singleLeaveSlice from './redux/features/singleLeaveSlice';
import monthlyReportSlice from './redux/features/monthlySlice';
import employeeSlice from './redux/features/employeeSlice';
import singleEmployeeSlice from './redux/features/singleEmployeeSlice';
import announcementSlice from './redux/features/announcementSlice';
import upcomingEventSlice from './redux/features/upcomingEvents';

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
    holidaySlice: holidaySlice,
    leaveSlice: leaveSlice,
    singleLeave: singleLeaveSlice,
    monthlyReport: monthlyReportSlice,
    employeeSlice:employeeSlice,
    singleEmployeeSlice: singleEmployeeSlice,
    announcement: announcementSlice,
    upcomingEvents: upcomingEventSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
