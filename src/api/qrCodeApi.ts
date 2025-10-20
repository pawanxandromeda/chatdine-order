// src/api/qrCodeApi.ts
import { api } from './axiosInstance';
import { IQRCode } from '@/types/qrCode'; // Assuming you have a type definition for IQRCode

// Get all QR codes
export const getQRCodesApi = async (): Promise<IQRCode[]> => {
  const response = await api.get('/qrcode');
  return response.data.data;
};

// Get a single QR code by ID
export const getQRCodeByIdApi = async (id: string): Promise<IQRCode> => {
  const response = await api.get(`/qrcode/${id}`);
  return response.data.data;
};

// Create a new QR code
export const createQRCodeApi = async (data: {
  tableNumber: string;
  tableType: IQRCode['tableType'];
}): Promise<IQRCode> => {
  const response = await api.post('/qrcode', data);
  return response.data.data;
};

// Update a QR code
export const updateQRCodeApi = async (
  id: string,
  data: Partial<IQRCode>
): Promise<IQRCode> => {
  const response = await api.put(`/qrcode/${id}`, data);
  return response.data.data;
};

// Toggle QR code status
export const toggleQRCodeStatusApi = async (id: string): Promise<IQRCode> => {
  const response = await api.patch(`/qrcode/${id}/toggle`);
  return response.data.data;
};

// Delete a QR code
export const deleteQRCodeApi = async (id: string): Promise<void> => {
  const response = await api.delete(`/qrcode/${id}`);
  return response.data;
};

// Increment scan count (if needed for frontend-triggered scan tracking)
export const incrementScanCountApi = async (id: string): Promise<IQRCode> => {
  const response = await api.post(`/qrcode/${id}/scan`); // Assuming a scan endpoint exists
  return response.data.data;
};