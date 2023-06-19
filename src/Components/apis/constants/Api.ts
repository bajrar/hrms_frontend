import axios, { AxiosResponse } from 'axios';
import { API_URL } from './constant';
import { axiosApiInstance } from './ApisService';

export const logoutUser = () => {
  localStorage.clear();
  window.location.replace('/');
};

axiosApiInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // Log the user out
      logoutUser();
    }
    return Promise.reject(error);
  }
);
