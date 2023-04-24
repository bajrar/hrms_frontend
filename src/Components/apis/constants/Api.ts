import axios from 'axios';
import { API_URL } from './constant';

const getApis = (api: string) => {
  const token = localStorage.getItem('token');
  const data = axios.get(`${API_URL}/${api}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export default getApis;
