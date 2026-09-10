import { useState, useEffect, useCallback } from 'react';
import tripService from '../services/tripService';

export function useTrips(category = 'ALL', onlyUser = false) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (onlyUser) {
        data = await tripService.getUserTrips();
      } else {
        data = await tripService.getCuratedTrips(category);
      }
      setTrips(data);
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError(err.response?.data?.message || 'Failed to load trips');
    } finally {
      setLoading(false);
    }
  }, [category, onlyUser]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return { trips, loading, error, refetch: fetchTrips };
}

export default useTrips;
