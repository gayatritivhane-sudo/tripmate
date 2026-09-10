export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  DESTINATIONS: {
    BASE: '/destinations',
    TRENDING: '/destinations/trending',
    BY_ID: (id) => `/destinations/${id}`,
  },
  TRIPS: {
    BASE: '/trips',
    CURATED: '/trips/curated',
    MY_TRIPS: '/trips/my-trips',
    BY_ID: (id) => `/trips/${id}`,
  },
  REVIEWS: {
    BASE: '/reviews',
  },
  NEWSLETTER: {
    SUBSCRIBE: '/newsletter/subscribe',
  },
};
