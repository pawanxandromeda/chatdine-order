// Type for authentication API responses
export interface AuthResponse {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    // Add other fields as needed
  };
  accessToken: string;
  refreshToken: string;
}
// src/api/authApi.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const signupApi = async (data: {
  firstName: string;
  lastName: string;
  restaurantName?: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  } 
};

export const googleSignInApi = async (idToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/google-signin`, { idToken });
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { token: refreshToken });
  return response.data;
};