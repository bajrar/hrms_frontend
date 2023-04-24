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

const axiosApiInstance = axios.create();

const token = localStorage.getItem('token');
export const apis = {
  getLogin: ({ email, password }: LoginCredntialsT) => {
    return axiosApiInstance.post(`${API_URL}/users/login`, {
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
    return axiosApiInstance.get(`${API_URL}/getJobs`);
  },
  getJobsById: (id: string) => {
    return axiosApiInstance.get(`${API_URL}/getJob/${id}`);
  },
  deleteJob: (id: string) => {
    return axiosApiInstance.delete(`${API_URL}/jobs/${id}`);
  },
  updateJob: (id: any, values: any) => {
    return axiosApiInstance.put(`${API_URL}/job/${id}`, values);
  },

  //applicants
  createApplicant: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/createApplicant`, values);
  },
  getApplicants: () => {
    return axiosApiInstance.get(`${API_URL}/getApllicant`);
  },
  getApplicantsById: (id: string) => {
    return axiosApiInstance.get(`${API_URL}/getApllicantById/${id}`);
  },

  // Employee
  addEmployee: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/employee`, values);
  },
  addUserInDevice: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/createUserAttendance`, values);
  },

  addShift: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/createShift`, values);
  },
  attendanceReport: () => {
    return axiosApiInstance.get(
      `${API_URL}/getEmployeeAttendanceWithAttendance`
    );
  },
  getEmplpoyeeAttendanceRecord: () => {
    return axiosApiInstance.get(`${API_URL}/getEmployeeRecordWithAttendance`);
  },

  //shift
  addShifts: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/shift`, values);
  },
  deleteShifts: (shiftId: string) => {
    return axiosApiInstance.delete(`${API_URL}/shift/${shiftId}`);
  },
  assignShifts: (values: any, shiftId: string) => {
    return axiosApiInstance.post(`${API_URL}/shift/${shiftId}`, values);
  },
  updateShifts: (values: any, shiftId: string | undefined) => {
    return axiosApiInstance.patch(`${API_URL}/shift/${shiftId}`, values);
  },
  deleteEmployeeFromShift: (userSn: string) => {
    return axiosApiInstance.delete(`${API_URL}/shift/${userSn}/deleteIndividual
    `);
  },

  //device
  addDevice: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/device`, values);
  },
  deleteDevices: (deviceId: string) => {
    return axiosApiInstance.delete(`${API_URL}/device/${deviceId}`);
  },

  //holidays
  addHolidays: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/holiday`, values);
  },
  // leave
  addLeave: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/leave`, values);
  },
  assignLeave: (values: any, leaveId: string) => {
    return axiosApiInstance.post(
      `${API_URL}/leave/${leaveId}
    `,
      values
    );
  },
  deleteLeave: (leaveId: string) => {
    return axiosApiInstance.delete(`${API_URL}/leave/${leaveId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
