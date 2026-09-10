/**
 * Dynamic API Base URL resolver with automatic cloud normalization.
 * Connects to Render backend in production while preserving Vite proxy locally.
 */
export const normalizeApiBaseUrl = (rawUrl) => {
  let url = (rawUrl || '/api').trim();
  url = url.replace(/\/+$/, '');

  // If full external domain, ensure '/api' path prefix is present
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (!url.endsWith('/api')) {
      url = `${url}/api`;
    }
  } else if (!url.startsWith('/') && url !== '') {
    url = `/${url}`;
  }
  return url || '/api';
};

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);


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
