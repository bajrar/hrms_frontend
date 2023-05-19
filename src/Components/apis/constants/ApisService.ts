import axios from 'axios';

import { API_URL } from './constant';
type LoginCredntialsT = { email: string; password: string };
type JobCredentialsT = {
  title: string;
  employmentType: string;
  minExperience: number;
  descriptions: string;
  qnrs: string;
  country: string;
  city: string;
  status: string;
  jobType: string;
  jobDetail: string;
};
// type ApplicantCredentialsT = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: number;
//   address: string;
//   city: string;
//   state: string;
//   postal: string;
//   github: string;
//   resume: string;
// };
export const token = localStorage.getItem('token');

export const axiosApiInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
});

export const apis = {
  getLogin: ({ email, password }: LoginCredntialsT) => {
    return axiosApiInstance.post(`/users/login`, {
      email,
      password,
    });
  },

  //jobs
  createJob: ({
    title,
    employmentType,
    minExperience,
    descriptions,
    qnrs,
    country,
    city,
    status,
    jobType,
    jobDetail,
  }: JobCredentialsT) => {
    return axiosApiInstance.post(`${API_URL}/jobs`, {
      title,
      employmentType,
      minExperience,
      descriptions,
      qnrs,
      country,
      city,
      status,
      jobType,
      jobDetail,
    });
  },
  getJobs: () => {
    return axiosApiInstance.get(`/getJobs`);
  },
  getJobsById: (id: string) => {
    return axiosApiInstance.get(`/getJob/${id}`);
  },
  deleteJob: (id: string) => {
    return axiosApiInstance.delete(`/jobs/${id}`);
  },
  updateJob: (id: any, values: any) => {
    return axiosApiInstance.put(`/jobs/${id}`, values);
  },

  //applicants
  createApplicant: (values: any) => {
    return axiosApiInstance.post(`/createApplicant`, values);
  },
  getApplicants: () => {
    return axiosApiInstance.get(`/getApllicant`);
  },
  getApplicantsById: (id: string) => {
    return axiosApiInstance.get(`/getApllicantById/${id}`);
  },
  updateApplicantStatus: (values: any, id: string) => {
    return axiosApiInstance.patch(`/applicant/${id}`, values);
  },

  // Employee
  addEmployee: (values: any) => {
    return axiosApiInstance.post(`/employee`, values);
  },
  addUserInDevice: (values: any) => {
    return axiosApiInstance.post(`/createUserAttendance`, values);
  },

  addShift: (values: any) => {
    return axiosApiInstance.post(`/createShift`, values);
  },
  attendanceReport: () => {
    return axiosApiInstance.get(`/getEmployeeAttendanceWithAttendance`);
  },
  getEmplpoyeeAttendanceRecord: () => {
    return axiosApiInstance.get(`/getEmployeeRecordWithAttendance`);
  },

  //shift
  addShifts: (values: any) => {
    return axiosApiInstance.post(`/shift`, values);
  },
  deleteShifts: (shiftId: string) => {
    return axiosApiInstance.delete(`/shift/${shiftId}`);
  },
  assignShifts: (values: any, shiftId: string) => {
    return axiosApiInstance.post(`/shift/${shiftId}`, values);
  },
  updateShifts: (values: any, shiftId: string | undefined) => {
    return axiosApiInstance.patch(`/shift/${shiftId}`, values);
  },
  deleteEmployeeFromShift: (userSn: string) => {
    return axiosApiInstance.delete(
      `/shift/${userSn}/deleteIndividual
    `
    );
  },

  //device
  addDevice: (values: any) => {
    return axiosApiInstance.post(`/device`, values);
  },
  deleteDevices: (deviceId: string) => {
    return axiosApiInstance.delete(`/device/${deviceId}`);
  },
  updateDevice: (values: any, deviceId: string) => {
    return axiosApiInstance.patch(`/device/${deviceId}`, values);
  },

  //holidays
  addHolidays: (values: any) => {
    return axiosApiInstance.post(`/holiday`, values);
  },
  // leave
  addLeave: (values: any) => {
    return axiosApiInstance.post(`/leave`, values);
  },
  assignLeave: (values: any, leaveId: string) => {
    return axiosApiInstance.post(
      `/leave/${leaveId}
    `,
      values
    );
  },
  deleteLeave: (leaveId: string) => {
    return axiosApiInstance.delete(`/leave/${leaveId}`);
  },
  updateLeave: (values: any, leaveId: string) => {
    return axiosApiInstance.patch(`/leave/${leaveId}`, values);
  },
};
