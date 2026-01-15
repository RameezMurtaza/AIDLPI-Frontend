// src/utils/axiosInstance.ts
import axios from 'axios';
import { API_BASE_URL } from './constants';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': 'z9srWb95rY5YeiJy9GuchsD9VI3C4D',
  },
  timeout: 10000,
});

export default instance;
