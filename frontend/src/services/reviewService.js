import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const reviewService = {
  async getAllReviews() {
    const response = await apiClient.get(ENDPOINTS.REVIEWS.BASE);
    return response.data.data;
  },
};

export default reviewService;
