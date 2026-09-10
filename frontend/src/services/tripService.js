import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const tripService = {
  async getCuratedTrips(category) {
    const params = {};
    if (category && category !== 'ALL') params.category = category;
    const response = await apiClient.get(ENDPOINTS.TRIPS.CURATED, { params });
    return response.data.data;
  },

  async getUserTrips() {
    const response = await apiClient.get(ENDPOINTS.TRIPS.MY_TRIPS);
    return response.data.data;
  },

  async getTripById(id) {
    const response = await apiClient.get(ENDPOINTS.TRIPS.BY_ID(id));
    return response.data.data;
  },

  async createTrip(tripData) {
    const response = await apiClient.post(ENDPOINTS.TRIPS.BASE, tripData);
    return response.data.data;
  },

  async updateTrip(id, tripData) {
    const response = await apiClient.put(ENDPOINTS.TRIPS.BY_ID(id), tripData);
    return response.data.data;
  },

  async deleteTrip(id) {
    const response = await apiClient.delete(ENDPOINTS.TRIPS.BY_ID(id));
    return response.data.data;
  },
};

export default tripService;
