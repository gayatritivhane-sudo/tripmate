import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDestinations from '../../hooks/useDestinations';
import { DESTINATION_CATEGORIES } from '../../constants/theme';
import { formatCurrency } from '../../utils/formatters';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';

export default function ExplorePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalDest, setActiveModalDest] = useState(null);

  const { destinations, loading, error } = useDestinations(selectedCategory, searchTerm);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-2xl">
      
      {/* Header */}
      <div className="mb-space-2xl text-center md:text-left">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
          Explore The Globe
        </span>
        <h1 className="font-display text-[32px] md:text-headline-lg text-on-surface tracking-tight font-extrabold">
          Discover Extraordinary Destinations
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
          Browse verified sanctuaries and vibrant cultural capitals with built-in AI travel blueprints and budget estimates.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-3xl shadow-sm border border-outline-variant/30 mb-space-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80 flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-primary text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search country or city..."
            className="w-full bg-surface-container-low pl-10 pr-4 py-2 rounded-full text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/40"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {DESTINATION_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content State */}
      {loading ? (
        <Spinner size="lg" className="py-24" />
      ) : error ? (
        <div className="text-center py-16 bg-surface-container-lowest rounded-3xl border border-error/20 p-8">
          <p className="text-error font-semibold mb-2">{error}</p>
          <p className="text-sm text-on-surface-variant">Please make sure the backend service is running.</p>
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">travel_explore</span>
          <h3 className="font-headline-sm text-on-surface font-bold">No destinations found</h3>
          <p className="text-sm text-on-surface-variant mt-1">Try tweaking your search term or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col border border-outline-variant/20"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${dest.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-bold flex items-center gap-1 shadow-sm">
                  <span className="text-tertiary-container font-bold">★</span> {dest.rating?.toFixed(2)}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold mb-1">
                    {dest.tagline || dest.category}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-surface-container-lowest">
                    {dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-space-lg flex flex-col flex-1 justify-between">
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-space-md">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between pt-space-sm border-t border-outline-variant/20">
                  <div>
                    <span className="font-label-sm text-label-sm text-outline block">Avg 7-day budget</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      From {formatCurrency(dest.avgBudgetPerPerson, dest.currency)}
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/person</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalDest(dest)}
                      className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[20px]">info</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/plan-a-trip?destination=${encodeURIComponent(dest.name)}`)}
                      className="px-space-md py-space-xs rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm font-bold transition-all shadow-sm"
                    >
                      Plan Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Detail Modal */}
      {activeModalDest && (
        <Modal
          isOpen={!!activeModalDest}
          onClose={() => setActiveModalDest(null)}
          title={activeModalDest.name}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="w-full h-56 rounded-2xl overflow-hidden">
              <img
                src={activeModalDest.imageUrl}
                alt={activeModalDest.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider mb-2">
                {activeModalDest.category}
              </span>
              <h4 className="font-headline-sm text-on-surface font-bold">
                {activeModalDest.tagline}
              </h4>
              <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed">
                {activeModalDest.description}
              </p>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
              <div>
                <p className="text-xs text-outline uppercase font-semibold">Estimated Budget</p>
                <p className="text-lg font-bold text-on-surface">
                  {formatCurrency(activeModalDest.avgBudgetPerPerson, activeModalDest.currency)}
                  <span className="text-xs font-normal text-on-surface-variant"> / person (7 days)</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-outline uppercase font-semibold">Traveler Rating</p>
                <p className="text-lg font-bold text-on-surface flex items-center gap-1 justify-end">
                  <span className="text-tertiary-container">★</span> {activeModalDest.rating?.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalDest(null)}
                className="px-5 py-2 rounded-full border border-outline-variant/60 font-label-sm text-on-surface hover:bg-surface-container-low"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const dest = activeModalDest;
                  setActiveModalDest(null);
                  navigate(`/plan-a-trip?destination=${encodeURIComponent(dest.name)}`);
                }}
                className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-sm font-bold hover:bg-primary-container shadow-md"
              >
                Build AI Itinerary For {activeModalDest.name.split(',')[0]}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
