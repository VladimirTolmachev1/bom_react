import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_APINAME}/api`,
});

const token = localStorage.getItem('token');

if (token) {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
}

export { axiosInstance };
