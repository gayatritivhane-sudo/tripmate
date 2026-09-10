import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import destinationService from '../../services/destinationService';
import tripService from '../../services/tripService';
import reviewService from '../../services/reviewService';
import { formatCurrency } from '../../utils/formatters';
import Spinner from '../../components/common/Spinner';

export default function HomePage() {
  const navigate = useNavigate();

  // Search console states
  const [destinationInput, setDestinationInput] = useState('Kyoto, Japan');
  const [datesInput, setDatesInput] = useState('Oct 14 – Oct 22, 2025');
  const [travelersInput, setTravelersInput] = useState('2 Adults • Moderate');
  const [activeMode, setActiveMode] = useState('Full AI Itinerary');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Dynamic data states
  const [destinations, setDestinations] = useState([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  const [itineraries, setItineraries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [itinerariesLoading, setItinerariesLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    // Fetch destinations
    destinationService.getAllDestinations()
      .then((data) => setDestinations(data))
      .catch((err) => console.error('Failed to load destinations:', err))
      .finally(() => setDestinationsLoading(false));

    // Fetch reviews
    reviewService.getAllReviews()
      .then((data) => setReviews(data))
      .catch((err) => console.error('Failed to load reviews:', err))
      .finally(() => setReviewsLoading(false));
  }, []);

  useEffect(() => {
    setItinerariesLoading(true);
    tripService.getCuratedTrips(selectedCategory)
      .then((data) => setItineraries(data))
      .catch((err) => console.error('Failed to load itineraries:', err))
      .finally(() => setItinerariesLoading(false));
  }, [selectedCategory]);

  const handlePlanMyTrip = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      navigate(`/plan-a-trip?destination=${encodeURIComponent(destinationInput)}`);
    }, 800);
  };

  const itineraryFilters = [
    { id: 'ALL', label: 'All Itineraries' },
    { id: 'COUPLES', label: 'Couples Romantic' },
    { id: 'SOLO', label: 'Solo Traveler' },
    { id: 'FAMILY', label: 'Family Friendly' },
    { id: 'ADVENTURE', label: 'Adventure' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================== */}
      {/* 1. HERO SECTION & PLANNING CONSOLE */}
      {/* ========================================================== */}
      <section className="relative w-full overflow-hidden -mt-20 pt-28 pb-20 md:pb-28 lg:pb-36 bg-surface-container-lowest">
        {/* Atmospheric Ambient Background Graphic */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPtE_cUzfKb3bUQyjN4umj2R7aYBcDCDP-oOqWa7Dx4UoBL9zEBqYQZ-C0lAxte9-6RhyX3HLCqcnKosbkDFLy-Tvz-odguEbxJyqVM4aoUp2JiaLYPpOdCnsp-FBJibn9vLkNt9_Ul9PBDjGfVZm8vdu8G5Elar5IMCkrTN6trBJ-xaOoL0vR201i8ceU5Pq_dRlAyG6iinJPiuOfXgLOwcZac0S-9rnC0483hhayrlCJuXIGFrTQ')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/85 to-surface" />
          <div className="absolute -top-32 right-10 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl" />
          <div className="absolute top-48 -left-20 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop flex flex-col items-center text-center">
          {/* AI Engine 2.0 Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm mb-space-lg">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
            <span className="font-label-md text-label-md text-primary font-bold tracking-wide uppercase">
              AI-Powered Travel Engine 2.0
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-display text-on-surface max-w-4xl tracking-tight leading-none mb-space-md">
            Your Journey. Your Plan. <br className="hidden sm:inline" />
            <span className="text-primary">Your TripMate.</span>
          </h1>

          {/* Subheading */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-2xl">
            Plan smarter, travel better. Create hyper-personalized multi-destination trips, unlock hidden local gems, and effortlessly synchronize with companions in one serene hub.
          </p>

          {/* FLOATING INTERACTIVE PLANNING & SEARCH CONSOLE */}
          <div className="w-full max-w-5xl bg-surface-container-lowest rounded-3xl p-space-md md:p-space-lg shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1),0_0_1px_1px_rgba(15,23,42,0.05)] text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-space-sm items-center bg-surface-container-low/70 p-space-xs rounded-2xl">
              
              {/* Segment 1: Where */}
              <div className="lg:col-span-4 p-space-sm bg-surface-container-lowest rounded-xl hover:bg-surface-container-lowest transition-all">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  Where to?
                </label>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <input
                    type="text"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    placeholder="Kyoto, Amalfi, Banff..."
                    className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface placeholder:text-outline focus:outline-none truncate font-semibold"
                  />
                </div>
              </div>

              {/* Segment 2: Dates */}
              <div className="lg:col-span-3 p-space-sm bg-surface-container-lowest rounded-xl hover:bg-surface-container-lowest transition-all">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  When
                </label>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <input
                    type="text"
                    value={datesInput}
                    onChange={(e) => setDatesInput(e.target.value)}
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface font-semibold focus:outline-none truncate"
                  />
                </div>
              </div>

              {/* Segment 3: Travelers & Budget */}
              <div className="lg:col-span-3 p-space-sm bg-surface-container-lowest rounded-xl hover:bg-surface-container-lowest transition-all">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  Who &amp; Budget
                </label>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <input
                    type="text"
                    value={travelersInput}
                    onChange={(e) => setTravelersInput(e.target.value)}
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface font-semibold focus:outline-none truncate"
                  />
                </div>
              </div>

              {/* Action CTA */}
              <div className="lg:col-span-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handlePlanMyTrip}
                  disabled={isSynthesizing}
                  className="w-full h-14 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-[0_10px_20px_-5px_rgba(0,104,95,0.35)] transition-all disabled:opacity-75"
                >
                  {isSynthesizing ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                      <span>Plan My Trip</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Mode Pill Switcher & Popular Inspirations */}
            <div className="mt-space-md pt-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md text-body-sm text-body-sm text-on-surface-variant">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider mr-space-2xs">
                  Mode:
                </span>
                {['Full AI Itinerary', 'Flights', 'Stays', 'Experiences'].map((mode) => {
                  const icons = {
                    'Full AI Itinerary': '🗺️',
                    'Flights': '✈️',
                    'Stays': '🏨',
                    'Experiences': '🎒',
                  };
                  const active = activeMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setActiveMode(mode)}
                      className={`px-space-md py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                        active
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {icons[mode]} {mode}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-outline">Trending:</span>
                <span className="inline-flex gap-space-xs">
                  {['Amalfi', 'Bali', 'Banff', 'Reykjavik'].map((place, idx, arr) => (
                    <span key={place} className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setDestinationInput(`${place}`)}
                        className="hover:text-primary font-label-sm text-label-sm text-on-surface transition-colors"
                      >
                        {place}
                      </button>
                      {idx < arr.length - 1 && <span className="text-outline">•</span>}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 2. QUICK STATS BAR */}
      {/* ========================================================== */}
      <section className="w-full bg-surface-container py-space-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center">
          <div>
            <div className="font-headline-lg text-headline-lg text-primary font-extrabold">120K+</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">Trips Planned This Year</p>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-primary font-extrabold">98.6%</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">Personalization Accuracy</p>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-primary font-extrabold">180+</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">Countries &amp; Terrains Covered</p>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-primary font-extrabold">4.9 ★</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">Over 24,000 Ratings</p>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 3. POPULAR DESTINATIONS SECTION */}
      {/* ========================================================== */}
      <section className="w-full py-space-3xl bg-surface" id="destinations">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
                Global Inspiration
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Top Destinations for Your Next Adventure
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                Handpicked sanctuaries and vibrant cultural hubs with pre-optimized AI travel blueprints.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-space-2xs font-label-lg text-label-lg text-primary hover:text-primary-container font-bold group"
            >
              <span>View all destinations</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          {destinationsLoading ? (
            <Spinner size="lg" className="py-12" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${dest.imageUrl}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
                    <span className="absolute top-space-md right-space-md px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-bold flex items-center gap-1 shadow-sm">
                      <span className="text-tertiary-container font-bold">★</span> {dest.rating?.toFixed(2)}
                    </span>
                    <div className="absolute bottom-space-md left-space-md right-space-md">
                      <span className="inline-block px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold mb-1">
                        {dest.tagline || dest.category}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-surface-container-lowest">
                        {dest.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between pt-space-sm">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block">Avg 7-day budget</span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          From {formatCurrency(dest.avgBudgetPerPerson, dest.currency)}
                          <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/person</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/plan-a-trip?destination=${encodeURIComponent(dest.name)}`)}
                        className="px-space-md py-space-xs rounded-full bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-bold transition-all"
                      >
                        Explore Trips
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================== */}
      {/* 4. TRENDING TRIPS & CURATED ITINERARIES SECTION */}
      {/* ========================================================== */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
                Verified Blueprints
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Curated AI-Generated Itineraries
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                Clone, customize, or launch these itineraries with one click.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-space-xs overflow-x-auto pb-2 md:pb-0">
              {itineraryFilters.map((filter) => {
                const active = selectedCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setSelectedCategory(filter.id)}
                    className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {itinerariesLoading ? (
            <Spinner size="lg" className="py-12" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
              {itineraries.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                        {trip.durationDays} Days / {trip.durationNights} Nights
                      </span>
                      {trip.tag && (
                        <span className="font-label-sm text-label-sm text-outline font-semibold">
                          {trip.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                      {trip.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Destination: <span className="font-semibold text-on-surface">{trip.destination}</span> • Pace: {trip.pace}
                    </p>

                    {/* Highlights list */}
                    {trip.highlights && trip.highlights.length > 0 && (
                      <div className="space-y-space-xs bg-surface-container-low/60 p-space-md rounded-2xl mb-space-lg">
                        {trip.highlights.map((h, i) => (
                          <div key={h.id || i} className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                            <span>{h.dayRange}: {h.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between py-space-sm mb-space-md">
                      <div className="flex items-center gap-space-2xs">
                        <span className="material-symbols-outlined text-primary">payments</span>
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">
                          {formatCurrency(trip.totalCost, trip.currency)} total
                        </span>
                      </div>
                      <div className="flex -space-x-2">
                        {trip.collaboratorsMeta ? (
                          trip.collaboratorsMeta.split(',').map((initial, i) => (
                            <span
                              key={i}
                              className="inline-block w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold flex items-center justify-center border border-surface"
                            >
                              {initial}
                            </span>
                          ))
                        ) : (
                          <span className="inline-block w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold flex items-center justify-center">
                            AI
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/plan-a-trip?destination=${encodeURIComponent(trip.destination)}&title=${encodeURIComponent(trip.title)}`)}
                      className="w-full py-space-xs rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm font-bold flex items-center justify-center gap-space-2xs transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
                      <span>Customize with AI</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================== */}
      {/* 5. WHY TRIPMATE? (VALUE PROPOSITIONS) */}
      {/* ========================================================== */}
      <section className="w-full py-space-3xl bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-space-2xl">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
              Engineered for Frictionless Travel
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Why Modern Explorers Choose TripMate
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              Say goodbye to 30 open browser tabs, disorganized spreadsheets, and travel guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {/* Feature 1 */}
            <div className="p-space-xl rounded-3xl bg-surface-container-lowest shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-space-lg">
                  <span className="material-symbols-outlined text-[26px]">psychology</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Instant AI Itineraries
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hyper-personalized schedules configured around your travel style, dietary choices, and rest rhythm in seconds.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm">
                <span className="font-label-sm text-label-sm text-primary font-bold inline-flex items-center gap-1">
                  Zero effort • Real-time AI
                </span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-space-xl rounded-3xl bg-surface-container-lowest shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary mb-space-lg">
                  <span className="material-symbols-outlined text-[26px]">query_stats</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Smart Budget Intelligence
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Live cross-platform price tracking for flights, boutique accommodations, and ticket passes without hidden fees.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm">
                <span className="font-label-sm text-label-sm text-secondary font-bold inline-flex items-center gap-1">
                  Average 22% saved
                </span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-space-xl rounded-3xl bg-surface-container-lowest shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-lg">
                  <span className="material-symbols-outlined text-[26px]">group_work</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Seamless Group Sync
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Vote collaboratively on restaurants and excursions, split expenses evenly, and keep everybody in locked harmony.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm">
                <span className="font-label-sm text-label-sm text-tertiary font-bold inline-flex items-center gap-1">
                  Multi-user live polling
                </span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-space-xl rounded-3xl bg-surface-container-lowest shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface mb-space-lg">
                  <span className="material-symbols-outlined text-[26px]">offline_bolt</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Offline Companion
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Full itinerary access, geo-navigated maps, confirmation passes, and emergency translation even with zero cellular signal.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface font-bold inline-flex items-center gap-1">
                  100% Offline cached
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 6. HOW IT WORKS (3 SIMPLE STEPS) */}
      {/* ========================================================== */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-space-2xl">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
              Simple As 1-2-3
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              How TripMate Works For You
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              From spark of inspiration to your boarding gate in three frictionless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl relative">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="material-symbols-outlined text-outline text-[28px]">tune</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">
                  Tell Us Your Vibe
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Input destinations, preferred pace (relaxed vs packed), dining preferences, and budget tier.
                </p>
              </div>
              <div className="mt-space-lg p-space-sm rounded-xl bg-surface-container-low text-body-sm text-body-sm font-mono text-on-surface-variant">
                &gt; &quot;Couples, 8 days, cultural sights, medium pace&quot;
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="material-symbols-outlined text-primary text-[28px]">smart_toy</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">
                  AI Crafts The Plan
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Our algorithms organize geo-optimized routes, verify transit timings, and curate boutique stays.
                </p>
              </div>
              <div className="mt-space-lg p-space-sm rounded-xl bg-primary-fixed/40 text-body-sm text-body-sm font-medium text-primary flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping" />
                Generated in 4.2 seconds
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[28px]">flight_takeoff</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">
                  Book, Tweak &amp; Travel
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Fine-tune events with intuitive drag-and-drop, invite companions, and travel stress-free.
                </p>
              </div>
              <div className="mt-space-lg p-space-sm rounded-xl bg-surface-container-low text-body-sm text-body-sm font-medium text-on-surface flex items-center justify-between">
                <span>Passes &amp; Maps Ready</span>
                <span className="material-symbols-outlined text-primary text-[18px]">cloud_done</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 7. TESTIMONIALS SECTION */}
      {/* ========================================================== */}
      <section className="w-full py-space-3xl bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
                Real Experiences
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Loved by 120,000+ Explorers
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                See what independent voyagers, families, and remote workers have to say.
              </p>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Excellent</span>
              <div className="flex text-tertiary-container">★★★★★</div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">TrustScore 4.9</span>
            </div>
          </div>

          {reviewsLoading ? (
            <Spinner size="lg" className="py-12" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-surface-container-lowest p-space-xl rounded-3xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-tertiary-container mb-space-md">
                      {'★'.repeat(rev.rating || 5)}
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-lg">
                      “{rev.comment}”
                    </p>
                  </div>
                  <div className="flex items-center gap-space-md pt-space-sm">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high flex-shrink-0">
                      <img
                        alt={rev.authorName}
                        src={rev.authorAvatarUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-1">
                        {rev.authorName}
                        {rev.isVerified && (
                          <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                        )}
                      </div>
                      <span className="font-body-sm text-body-sm text-outline">{rev.authorRole}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================== */}
      {/* 8. PROMO CALL-TO-ACTION (CTA) BANNER */}
      {/* ========================================================== */}
      <section className="w-full py-space-3xl bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-space-xl md:p-space-3xl shadow-xl text-center text-on-primary">
            {/* Abstract background shapes */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container rounded-full blur-2xl opacity-60 pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-secondary-container/20 rounded-full blur-2xl opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-space-md py-1 rounded-full bg-on-primary/15 font-label-sm text-label-sm tracking-wider uppercase mb-space-md">
                ✨ Free Forever for Individual Travelers
              </span>
              <h2 className="font-headline-lg text-headline-lg md:font-display md:text-display font-extrabold tracking-tight mb-space-md text-on-primary">
                Ready to explore the world on your terms?
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/90 mb-space-2xl">
                Get started with your free customized AI itinerary in under 60 seconds. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md">
                <button
                  type="button"
                  onClick={() => navigate('/plan-a-trip')}
                  className="w-full sm:w-auto px-space-xl py-space-md rounded-full bg-surface text-primary font-label-lg text-label-lg font-bold hover:bg-surface-container-lowest shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] transition-all"
                >
                  Start Planning for Free
                </button>
                <Link
                  to="/explore"
                  className="w-full sm:w-auto px-space-xl py-space-md rounded-full bg-on-primary/10 text-on-primary hover:bg-on-primary/20 font-label-lg text-label-lg font-bold backdrop-blur-md transition-all"
                >
                  Browse Sample Itineraries
                </Link>
              </div>
              <div className="mt-space-xl flex items-center justify-center gap-space-lg text-body-sm text-body-sm text-on-primary/80">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">check</span> Instant export to PDF &amp; Calendar
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">check</span> Unlimited collaborator invites
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
