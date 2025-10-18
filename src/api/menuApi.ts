// src/api/menuApi.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Adjust based on your backend URL

export const getMenuItemsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/menu`);
  return response.data.data;
};

export const createMenuItemApi = async (data: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/menu`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const updateMenuItemApi = async (id: string, data: FormData) => {
  const response = await axios.put(`${API_BASE_URL}/menu/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const deleteMenuItemApi = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/menu/${id}`);
  return response.data;
};

export const toggleFeaturedApi = async (id: string) => {
  const response = await axios.patch(`${API_BASE_URL}/menu/${id}/featured`);
  return response.data.data;
};

export const toggleAvailableApi = async (id: string, available: boolean) => {
  const formData = new FormData();
  formData.append('available', available.toString());
  const response = await axios.put(`${API_BASE_URL}/menu/${id}`, formData);
  return response.data.data;
};