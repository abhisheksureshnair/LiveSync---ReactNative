import axios from 'axios';
import { BASE_URL } from '../services/Config';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/*
Optional:
Attach access token automatically
*/
api.interceptors.request.use(
  async config => {
    const token = global.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

/*
Global response handler
*/
api.interceptors.response.use(
  response => response.data,
  error => {
    const message =
      error?.response?.data ||
      error?.message ||
      'Something went wrong';

    return Promise.reject(message);
  },
);

export default api;