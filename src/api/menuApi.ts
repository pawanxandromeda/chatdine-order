// src/api/menuApi.ts
import { api } from './axiosInstance';

export const getMenuItemsApi = async () => {
  const response = await api.get('/menu');
  return response.data.data;
};

export const createMenuItemApi = async (data: FormData) => {
  const response = await api.post('/menu', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const updateMenuItemApi = async (id: string, data: FormData) => {
  const response = await api.put(`/menu/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const deleteMenuItemApi = async (id: string) => {
  const response = await api.delete(`/menu/${id}`);
  return response.data;
};

export const toggleFeaturedApi = async (id: string) => {
  const response = await api.patch(`/menu/${id}/featured`);
  return response.data.data;
};

export const toggleAvailableApi = async (id: string, available: boolean) => {
  const formData = new FormData();
  formData.append('available', available.toString());
  const response = await api.put(`/menu/${id}`, formData);
  return response.data.data;
};
