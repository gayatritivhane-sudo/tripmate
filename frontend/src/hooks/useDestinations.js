import { useState, useEffect, useCallback } from 'react';
import destinationService from '../services/destinationService';

export function useDestinations(category = 'ALL', search = '') {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await destinationService.getAllDestinations(category, search);
      setDestinations(data);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(err.response?.data?.message || 'Failed to load destinations');
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return { destinations, loading, error, refetch: fetchDestinations };
}

export default useDestinations;
