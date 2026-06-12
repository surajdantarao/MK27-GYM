import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const createMemberAccount = async (accountData) => {
  const response = await api.post('/users/register-member', accountData);
  return response.data;
};

export const resetMemberPassword = async (userId, password) => {
  const response = await api.put(`/users/reset-password/${userId}`, { password });
  return response.data;
};

export const toggleUserStatus = async (userId) => {
  const response = await api.put(`/users/toggle-status/${userId}`);
  return response.data;
};

export const getMemberAccount = async (memberId) => {
  const response = await api.get(`/users/member/${memberId}`);
  return response.data;
};