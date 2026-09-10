import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import tripService from '../../services/tripService';
import { formatCurrency, formatDateRange } from '../../utils/formatters';
import Spinner from '../../components/common/Spinner';
import Badge from '../../components/common/Badge';

export default function MyTripsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadUserTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripService.getUserTrips();
      setTrips(data);
    } catch (err) {
      console.error('Failed to load user trips:', err);
      setError(err.response?.data?.message || 'Could not load your trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserTrips();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip itinerary?')) return;
    setDeletingId(id);
    try {
      await tripService.deleteTrip(id);
      setTrips(trips.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete trip');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-2xl">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-space-2xl">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
            Travel Command Center
          </span>
          <h1 className="font-display text-[28px] md:text-headline-lg text-on-surface font-extrabold tracking-tight">
            My Trips &amp; Itineraries
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Welcome back, <span className="font-semibold text-on-surface">{user?.fullName || user?.username}</span>! Manage your scheduled blueprints and companion syncs.
          </p>
        </div>

        <div>
          <Link
            to="/plan-a-trip"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-lg font-bold hover:bg-primary-container shadow-[0_10px_20px_-5px_rgba(0,104,95,0.3)] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner size="lg" className="py-24" />
      ) : error ? (
        <div className="p-8 rounded-3xl bg-surface-container-lowest border border-error/20 text-center">
          <p className="text-error font-semibold mb-2">{error}</p>
          <button
            onClick={loadUserTrips}
            className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold mt-2"
          >
            Retry
          </button>
        </div>
      ) : trips.length === 0 ? (
        <div className="p-12 md:p-16 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px]">flight_takeoff</span>
          </div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-2">No trips planned yet</h3>
          <p className="font-body-md text-on-surface-variant mb-6">
            You don't have any active or saved travel plans. Use the AI Trip Planner or clone a curated blueprint from the explore catalog.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/plan-a-trip"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-sm font-bold hover:bg-primary-container"
            >
              Build with AI
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-surface-container-low text-on-surface font-label-sm font-bold hover:bg-surface-container"
            >
              Browse Destinations
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] border border-outline-variant/30 flex flex-col justify-between hover:border-primary/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="primary">
                    {trip.durationDays} Days / {trip.durationNights} Nights
                  </Badge>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {trip.status}
                  </span>
                </div>

                <h3 className="font-headline-sm text-on-surface font-bold mb-1">
                  {trip.title}
                </h3>
                <p className="font-body-sm text-primary font-semibold flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>{trip.destination}</span>
                </p>

                <div className="text-xs text-on-surface-variant space-y-1 mb-4 p-3 bg-surface-container-low rounded-xl">
                  <p><strong>Dates:</strong> {formatDateRange(trip.startDate, trip.endDate) || 'Flexible'}</p>
                  <p><strong>Pace:</strong> {trip.pace} • <strong>Travelers:</strong> {trip.travelersCount}</p>
                  <p><strong>Total Budget:</strong> {formatCurrency(trip.totalCost, trip.currency)}</p>
                </div>

                {/* Highlights */}
                {trip.highlights && trip.highlights.length > 0 && (
                  <div className="space-y-1.5 mb-6">
                    <p className="text-xs font-bold text-outline uppercase tracking-wider">Milestones</p>
                    {trip.highlights.slice(0, 3).map((h, i) => (
                      <div key={h.id || i} className="text-xs text-on-surface flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">check_circle</span>
                        <span className="line-clamp-1">{h.dayRange}: {h.title}</span>
                      </div>
                    ))}
                    {trip.highlights.length > 3 && (
                      <p className="text-[11px] text-outline italic">+{trip.highlights.length - 3} more days planned</p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(trip.id)}
                  disabled={deletingId === trip.id}
                  className="text-xs font-semibold text-error hover:text-red-700 flex items-center gap-1 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>{deletingId === trip.id ? 'Deleting...' : 'Delete'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Itinerary for ${trip.title} is synced to your offline mobile wallet.`)}
                  className="px-4 py-1.5 rounded-full bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary text-xs font-bold transition-colors"
                >
                  View Passes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
