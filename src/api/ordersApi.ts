// api/ordersApi.ts - Updated version
import { api } from './axiosInstance';

// Create WebSocket connection
export const createWebSocketConnection = (vendorId: string) => {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
  return new WebSocket(`${wsUrl}/orders?vendorId=${vendorId}`);
};

// Order APIs - Updated to match backend routes
export const getVendorOrders = async (vendorId: string, filters?: any) => {
  const response = await api.get(`/orders/vendor/me`, {
    params: {
      ...filters,
      vendorId // Keep for backward compatibility
    }
  });
  return response.data;
};

export const getOrder = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatusApi = async (orderId: string, status: string) => {
  const response = await api.patch(`/orders/${orderId}/status`, {
    status
  });
  return response.data;
};

export const cancelOrderApi = async (orderId: string, reason?: string) => {
  const response = await api.post(`/orders/${orderId}/cancel`, {
    reason
  });
  return response.data;
};

export const updateVendorSettings = async (settings: any) => {
  const response = await api.patch(`/orders/vendor/settings`, settings);
  return response.data;
};

export const getVendorSettings = async () => {
  const response = await api.get(`/orders/vendor/settings`);
  return response.data;
};

export const getOrderStatisticsApi = async (period?: string) => {
  const response = await api.get(`/orders/vendor/stats`, {
    params: { period }
  });
  return response.data;
};

export const getRevenueStatsApi = async (period?: string) => {
  const response = await api.get(`/orders/vendor/revenue`, {
    params: { period }
  });
  return response.data;
};

export const addOrderNoteApi = async (orderId: string, note: string) => {
  const response = await api.post(`/orders/${orderId}/note`, { note });
  return response.data;
};