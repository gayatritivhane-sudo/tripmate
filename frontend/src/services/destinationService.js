import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const destinationService = {
  async getAllDestinations(category, search) {
    const params = {};
    if (category && category !== 'ALL') params.category = category;
    if (search) params.search = search;
    const response = await apiClient.get(ENDPOINTS.DESTINATIONS.BASE, { params });
    return response.data.data;
  },

  async getTrendingDestinations() {
    const response = await apiClient.get(ENDPOINTS.DESTINATIONS.TRENDING);
    return response.data.data;
  },

  async getDestinationById(id) {
    const response = await apiClient.get(ENDPOINTS.DESTINATIONS.BY_ID(id));
    return response.data.data;
  },
};

export default destinationService;
