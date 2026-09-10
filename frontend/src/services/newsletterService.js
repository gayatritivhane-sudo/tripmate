import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const newsletterService = {
  async subscribe(email) {
    const response = await apiClient.post(ENDPOINTS.NEWSLETTER.SUBSCRIBE, { email });
    return response.data;
  },
};

export default newsletterService;
