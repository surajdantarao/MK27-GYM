import api from './api';

export const getProgress = async (memberId) => {
  const response = await api.get(`/progress/${memberId}`);
  return response.data;
};

export const logProgress = async (progressData) => {
  const response = await api.post('/progress', progressData);
  return response.data;
};
