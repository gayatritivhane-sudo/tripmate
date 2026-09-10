import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('tripmate_token', response.data.data.token);
      localStorage.setItem('tripmate_user', JSON.stringify(response.data.data.user));
    }
    return response.data.data;
  },

  async register(userData) {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('tripmate_token', response.data.data.token);
      localStorage.setItem('tripmate_user', JSON.stringify(response.data.data.user));
    }
    return response.data.data;
  },

  async getCurrentUser() {
    const response = await apiClient.get(ENDPOINTS.AUTH.ME);
    return response.data.data;
  },

  logout() {
    localStorage.removeItem('tripmate_token');
    localStorage.removeItem('tripmate_user');
  },

  getStoredToken() {
    return localStorage.getItem('tripmate_token');
  },

  getStoredUser() {
    const userStr = localStorage.getItem('tripmate_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default authService;
