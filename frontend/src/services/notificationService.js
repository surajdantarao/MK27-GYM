import api from './api';

export const getNotifications = async (memberId) => {
  const response = await api.get(`/notifications/${memberId}`);
  return response.data;
};

export const createNotification = async (notificationData) => {
  const response = await api.post('/notifications', notificationData);
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};
