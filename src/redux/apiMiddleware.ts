import { announceSliceApi } from "./api/announceSliceApi";
import { applicantApiSlice } from "./api/applicantApiSlice";
import { attendanceByDateApi } from "./api/attendanceByDateSlice";
import { dashboardSliceApi } from "./api/dashboard/dashboardSliceApi";
import { deviceApiSlice } from "./api/device/deviceApiSlice";
import { employeeApi } from "./api/employeeApiSlice";
import { employeeWorkhourSliceApi } from "./api/employeeWorkhour";
import { eventSliceApi } from "./api/eventSliceApi";
import { holidayApiSlice } from "./api/holidays/holidayApiSlice";
import { leaveSliceApi } from "./api/leaveSlice";
import { reportApiSlice } from "./api/report/reportApiSlice";
import { shiftApiSlice } from "./api/shift/shiftApiSlice";
import { tokenSliceApi } from "./api/tokenSlice";
import { attendanceRequestSlice } from "./features/attendanceUpdateSlice";
import { profileSlice } from "./features/profileSlice";
import { projectTeamSlice } from "./features/projectTeam.slice";

export const apiMiddleware = [
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
    dashboardSliceApi.middleware,
    reportApiSlice.middleware,
    shiftApiSlice.middleware,
    deviceApiSlice.middleware
  ]