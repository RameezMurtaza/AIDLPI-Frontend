// src/api/authApi.ts
import axios from '../utils/axiosInstance';

export const login = async (username: string, password: string) => {
  const response = await axios.post('/auth/login', {
    login: username,
    password: password,
  });
  return response.data;
};

export const changePassword = async (accessToken: string, currentPassword: string, newPassword: string) => {
  const response = await axios.post(
    '/auth/change-password',
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

export const refreshSession = async (refreshToken: string) => {
  const response = await axios.post('/auth/refresh', { refreshToken });
  return response.data;
};
