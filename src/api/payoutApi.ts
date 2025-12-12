import { api } from "./axiosInstance";

// Create payout account
export const createRazorpayAccountApi = async (payload: any) => {
  const response = await api.post('/payout/create', payload);
  return response.data;
};

// Get payout account
export const getPayoutAccountApi = async () => {
  const response = await api.get('/payout/get');
  return response.data;
};

// Update payout account
export const updatePayoutAccountApi = async (payload: any) => {
  const response = await api.put('/payout/update', payload);
  return response.data;
};

// Delete payout account
export const deletePayoutAccountApi = async () => {
  const response = await api.delete('/payout/delete');
  return response.data;
};

// Make payout
export const makePayoutApi = async (payload: any) => {
  const response = await api.post('/payout/send', payload);
  return response.data;
};

// Test payout
export const testPayoutApi = async (payload: any) => {
  const response = await api.post('/payout/test', payload);
  return response.data;
};

// Verify payout status
export const verifyPayoutStatusApi = async (payoutId: string) => {
  const response = await api.get(`/payout/status/${payoutId}`);
  return response.data;
};
