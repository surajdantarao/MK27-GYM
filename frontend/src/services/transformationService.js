import api from './api';

export const getPublicTransformations = async () => {
  const response = await api.get('/progress/public/transformations');
  return response.data;
};
