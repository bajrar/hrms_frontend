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
    return axiosApiInstance.delete(`${API_URL}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateJob: (id: any, values: any) => {
    return axiosApiInstance.put(`${API_URL}/job/${id}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //applicants
  createApplicant: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/createApplicant`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getApplicants: () => {
    return axiosApiInstance.get(`${API_URL}/getApllicant`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getApplicantsById: (id: string) => {
    return axiosApiInstance.get(`${API_URL}/getApllicantById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Employee
  addEmployee: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/employee`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  addUserInDevice: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/createUserAttendance`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addShift: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/createShift`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  attendanceReport: () => {
    return axiosApiInstance.get(
      `${API_URL}/getEmployeeAttendanceWithAttendance`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  getEmplpoyeeAttendanceRecord: () => {
    return axiosApiInstance.get(`${API_URL}/getEmployeeRecordWithAttendance`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //shift
  addShifts: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/shift`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteShifts: (shiftId: string) => {
    return axiosApiInstance.delete(`${API_URL}/shift/${shiftId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  assignShifts: (values: any, shiftId: string) => {
    return axiosApiInstance.post(`${API_URL}/shift/${shiftId}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateShifts: (values: any, shiftId: string | undefined) => {
    return axiosApiInstance.patch(`${API_URL}/shift/${shiftId}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteEmployeeFromShift: (userSn: string) => {
    return axiosApiInstance.delete(
      `${API_URL}/shift/${userSn}/deleteIndividual
    `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  //device
  addDevice: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/device`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteDevices: (deviceId: string) => {
    return axiosApiInstance.delete(`${API_URL}/device/${deviceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //holidays
  addHolidays: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/holiday`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // leave
  addLeave: (values: any) => {
    return axiosApiInstance.post(`${API_URL}/leave`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  assignLeave: (values: any, leaveId: string) => {
    return axiosApiInstance.post(
      `${API_URL}/leave/${leaveId}
    `,
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  deleteLeave: (leaveId: string) => {
    return axiosApiInstance.delete(`${API_URL}/leave/${leaveId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateLeave: (values: any, leaveId: string) => {
    return axiosApiInstance.patch(`${API_URL}/leave/${leaveId}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
