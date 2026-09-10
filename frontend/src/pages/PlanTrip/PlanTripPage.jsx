import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import tripService from '../../services/tripService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function PlanTripPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const queryDest = searchParams.get('destination') || 'Kyoto, Japan';
  const queryTitle = searchParams.get('title') || '';

  const [formData, setFormData] = useState({
    destination: queryDest,
    title: queryTitle || `Journey to ${queryDest}`,
    durationDays: 7,
    durationNights: 6,
    category: 'COUPLES',
    pace: 'MODERATE',
    travelersCount: 2,
    totalCost: 1850,
    currency: 'USD',
    startDate: '2025-10-14',
    endDate: '2025-10-21',
  });

  const [highlights, setHighlights] = useState([
    { dayRange: 'Day 1-2', title: 'Arrival & Historic Cultural Exploration', description: 'Check-in, welcome tea ceremony, and evening lantern district walk', orderIndex: 1 },
    { dayRange: 'Day 3-4', title: 'Scenic Nature & Local Culinary Delights', description: 'Bamboo groves, traditional craft workshops, and riverfront dining', orderIndex: 2 },
    { dayRange: 'Day 5-7', title: 'Modern Discovery & Departure', description: 'Bullet train excursion, vibrant marketplace shopping, and farewell rooftop dinner', orderIndex: 3 },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    if (queryDest) {
      setFormData((prev) => ({
        ...prev,
        destination: queryDest,
        title: queryTitle || `Journey to ${queryDest.split(',')[0]}`,
      }));
    }
  }, [queryDest, queryTitle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHighlightChange = (index, field, value) => {
    const updated = [...highlights];
    updated[index][field] = value;
    setHighlights(updated);
  };

  const handleAddHighlight = () => {
    const nextIndex = highlights.length + 1;
    setHighlights([
      ...highlights,
      {
        dayRange: `Day ${nextIndex}`,
        title: 'Curated Local Experience',
        description: 'Guided tour and hidden culinary spot exploration',
        orderIndex: nextIndex,
      },
    ]);
  };

  const handleRemoveHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleAIOptimize = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      // Auto optimize title, budget, and highlights based on selected destination and category
      const destName = formData.destination.split(',')[0].trim();
      let estCost = 1500;
      if (formData.category === 'COUPLES') estCost = 2100;
      if (formData.category === 'ADVENTURE') estCost = 2400;
      if (formData.category === 'FAMILY') estCost = 2900;
      if (formData.category === 'SOLO') estCost = 1150;

      setFormData((prev) => ({
        ...prev,
        title: `${formData.durationDays} Days in Enchanting ${destName}`,
        totalCost: estCost * (formData.travelersCount > 1 ? 1.5 : 1),
      }));

      setHighlights([
        { dayRange: 'Day 1-2', title: `${destName} Arrival & City Center Discovery`, description: 'Boutique stay check-in and serene sunset orientation walk', orderIndex: 1 },
        { dayRange: 'Day 3-4', title: `Iconic Highlights & Scenic Excursions`, description: 'Early access to famous landmarks and local culinary tasting trail', orderIndex: 2 },
        { dayRange: `Day 5-${formData.durationDays}`, title: 'Hidden Gems & Leisure Wrap-up', description: 'Off-the-beaten-path artisan visits and memorable farewell gathering', orderIndex: 3 },
      ]);
    }, 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Save draft and prompt login
      localStorage.setItem('tripmate_pending_trip', JSON.stringify({ ...formData, highlights }));
      navigate('/login?redirect=plan-a-trip');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        durationDays: Number(formData.durationDays),
        durationNights: Number(formData.durationNights),
        travelersCount: Number(formData.travelersCount),
        totalCost: Number(formData.totalCost),
        tag: 'AI Optimized',
        highlights: highlights.map((h, i) => ({
          ...h,
          orderIndex: i + 1,
        })),
      };

      await tripService.createTrip(payload);
      navigate('/my-trips');
    } catch (err) {
      console.error('Failed to create trip:', err);
      setError(err.response?.data?.message || 'Failed to save trip. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-tablet py-space-2xl">
      
      {/* Page Title */}
      <div className="text-center mb-space-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-primary font-bold text-xs uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>AI Itinerary Builder</span>
        </div>
        <h1 className="font-display text-[32px] md:text-headline-lg text-on-surface font-extrabold tracking-tight">
          Craft Your Personalized Journey
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-2">
          Configure destination details, dates, and companion preferences. Let our algorithms synthesize your blueprint.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-error/30 text-error text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] border border-outline-variant/30 space-y-8">
        
        {/* Section 1: Trip Essentials */}
        <div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">pin_drop</span>
            <span>Trip Essentials</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Trip Title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Destination"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              icon="location_on"
              required
            />
          </div>
        </div>

        {/* Section 2: Dates & Travelers */}
        <div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">calendar_month</span>
            <span>Schedule &amp; Group</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Input
              label="Start Date"
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
            <Input
              label="End Date"
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Duration (Days)"
              id="durationDays"
              name="durationDays"
              type="number"
              min="1"
              value={formData.durationDays}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Travelers"
              id="travelersCount"
              name="travelersCount"
              type="number"
              min="1"
              value={formData.travelersCount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Section 3: Vibe & Budget */}
        <div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tune</span>
            <span>Travel Style &amp; Pace</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                Travel Style
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl border border-outline-variant/60 p-2.5 focus:outline-none focus:border-primary"
              >
                <option value="COUPLES">Couples Romantic</option>
                <option value="SOLO">Solo Traveler</option>
                <option value="FAMILY">Family Friendly</option>
                <option value="ADVENTURE">Adventure</option>
              </select>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                Pace
              </label>
              <select
                name="pace"
                value={formData.pace}
                onChange={handleInputChange}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl border border-outline-variant/60 p-2.5 focus:outline-none focus:border-primary"
              >
                <option value="RELAXED">Relaxed</option>
                <option value="MODERATE">Moderate</option>
                <option value="FAST">Fast-Paced</option>
              </select>
            </div>

            <div>
              <Input
                label="Target Budget ($ USD)"
                id="totalCost"
                name="totalCost"
                type="number"
                value={formData.totalCost}
                onChange={handleInputChange}
                icon="payments"
              />
            </div>
          </div>
        </div>

        {/* Section 4: AI Itinerary Highlights */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-sm text-on-surface font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">format_list_bulleted</span>
              <span>Itinerary Milestones</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAIOptimize}
                disabled={aiGenerating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-colors"
              >
                <span className={`material-symbols-outlined text-[16px] ${aiGenerating ? 'animate-spin' : ''}`}>
                  auto_awesome
                </span>
                <span>{aiGenerating ? 'Optimizing...' : 'Regenerate with AI'}</span>
              </button>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Day</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {highlights.map((h, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between"
              >
                <div className="w-full md:w-32">
                  <input
                    type="text"
                    value={h.dayRange}
                    onChange={(e) => handleHighlightChange(index, 'dayRange', e.target.value)}
                    placeholder="Day 1-2"
                    className="w-full bg-surface-container-lowest text-xs font-bold px-2 py-1.5 rounded-lg border border-outline-variant/40"
                  />
                </div>
                <div className="flex-1 w-full space-y-1.5">
                  <input
                    type="text"
                    value={h.title}
                    onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
                    placeholder="Milestone Title"
                    className="w-full bg-surface-container-lowest text-sm font-semibold px-3 py-1.5 rounded-lg border border-outline-variant/40"
                  />
                  <input
                    type="text"
                    value={h.description || ''}
                    onChange={(e) => handleHighlightChange(index, 'description', e.target.value)}
                    placeholder="Brief description of key activities"
                    className="w-full bg-surface-container-lowest text-xs text-on-surface-variant px-3 py-1.5 rounded-lg border border-outline-variant/40"
                  />
                </div>
                {highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    className="text-outline hover:text-error p-1"
                    title="Remove Milestone"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="w-full sm:w-auto px-8"
          >
            <span className="material-symbols-outlined text-[20px] mr-2">save</span>
            <span>{isAuthenticated ? 'Save to My Trips' : 'Login & Save Trip'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
