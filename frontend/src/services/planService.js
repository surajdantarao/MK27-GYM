import api from './api';

export const getWorkoutPlan = async (memberId) => {
  const response = await api.get(`/plans/workout/${memberId}`);
  return response.data;
};

export const updateWorkoutPlan = async (planData) => {
  const response = await api.post('/plans/workout', planData);
  return response.data;
};

export const getDietPlan = async (memberId) => {
  const response = await api.get(`/plans/diet/${memberId}`);
  return response.data;
};

export const updateDietPlan = async (planData) => {
  const response = await api.post('/plans/diet', planData);
  return response.data;
};
