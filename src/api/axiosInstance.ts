import axios from 'axios';
import { getDefaultStore } from 'jotai';
import { accessTokenAtom } from '@/atoms/userAtom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get Jotai store
const store = getDefaultStore();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { token: refreshToken });
          const newToken = data.accessToken;

          // Update Jotai and localStorage
          store.set(accessTokenAtom, newToken);  // ✅ store is now defined
          localStorage.setItem("accessToken", newToken);

          originalReq.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalReq);
        } catch (refreshErr) {
          // Refresh token invalid, log out user
          store.set(accessTokenAtom, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(refreshErr);
        }
      }
    }
    return Promise.reject(err);
  }
);
