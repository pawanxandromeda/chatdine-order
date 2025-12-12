// src/api/foodCourtApi.ts
import { api } from './axiosInstance';

// Get all food courts
export const getFoodCourtsApi = async () => {
  const response = await api.get('/food-courts');
  return response.data.data;
};

// Get specific food court
export const getFoodCourtApi = async (id: string) => {
  const response = await api.get(`/food-courts/${id}`);
  return response.data.data;
};

// Get joinable food courts for current user
export const getJoinableFoodCourtsApi = async () => {
  const response = await api.get('/food-courts/join-options');
  return response.data.data;
};

// Join a food court
export const joinFoodCourtApi = async (foodCourtId: string) => {
  const response = await api.post('/food-courts/join', { foodCourtId });
  return response.data.data;
};

// Leave current food court
export const leaveFoodCourtApi = async () => {
  const response = await api.post('/food-courts/leave');
  return response.data;
};

// Get current user's food court info
export const getMyFoodCourtApi = async () => {
  const response = await api.get('/user/me'); // Assuming this endpoint exists
  return response.data.data?.foodCourt || null;
};

// Create food court (admin only)
export const createFoodCourtApi = async (data: {
  name: string;
  city: string;
}) => {
  const response = await api.post('/food-courts', data);
  return response.data.data;
};