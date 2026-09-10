import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import newsletterService from '../../services/newsletterService';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ state: 'loading', message: '' });
    try {
      await newsletterService.subscribe(email);
      setStatus({ state: 'success', message: 'Thank you for subscribing to TripMate!' });
      setEmail('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to subscribe. Please try again.';
      setStatus({ state: 'error', message: msg });
    }
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-xl">
          
          {/* Company Brand Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex items-center gap-space-xs">
              <img
                alt="TripMate Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYBAdN6l-Io2z2IE9ZTP40HoSLkJgHdP17qe9VxEI5mnjOmfzNthf5bjPk_n3zclWJOwTkENuJ2zLCH4xFhKvwfhg5gT84dvqQ1oj8NbQ-g3gqC9AJZf8ec1hlrdxmnJfDYploUAqOHCSnv7XpvgGODSBE4Prvz2sfPxrMXbMfHYTkk1x0hkekDE6Z-u7VuVzjA4bbKUZPvi9emLWCi7CHpwi6Y2IV-WztuNPKJ-7yYMgUP-2sVExB"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                TripMate
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Your intelligent travel companion curating seamless multi-destination journeys with modern clarity and AI-driven precision.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-space-xs">
              <p className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-xs font-bold">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-space-xs max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-space-xs rounded-full border border-outline-variant/60 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="bg-primary text-on-primary font-label-sm text-label-sm px-space-md py-space-xs rounded-full hover:bg-primary-container transition-colors disabled:opacity-50"
                >
                  {status.state === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {status.message && (
                <p className={`mt-2 text-xs font-semibold ${status.state === 'success' ? 'text-emerald-700' : 'text-error'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">
              Discover
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link to="/explore" className="hover:text-on-surface transition-colors">Popular Destinations</Link></li>
              <li><Link to="/plan-a-trip" className="hover:text-on-surface transition-colors">AI Trip Generator</Link></li>
              <li><Link to="/explore" className="hover:text-on-surface transition-colors">Flight Tracker</Link></li>
              <li><Link to="/explore" className="hover:text-on-surface transition-colors">Curated Stays</Link></li>
              <li><Link to="/explore" className="hover:text-on-surface transition-colors">Weekend Escapes</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">
              Company
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link to="/about" className="hover:text-on-surface transition-colors">About Us</Link></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Careers</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Press &amp; Media</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Sustainability</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Partnerships</span></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">
              Resources
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Travel Guides</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Community Forum</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Help Center</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Packing Checklists</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Safety Advice</span></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-space-md font-bold">
              Legal
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Cookie Preferences</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Trust &amp; Safety</span></li>
              <li><span className="cursor-pointer hover:text-on-surface transition-colors">Licensing</span></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-space-2xl pt-space-lg border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 TripMate Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
            <span className="cursor-pointer hover:text-on-surface transition-colors">Status</span>
            <span className="cursor-pointer hover:text-on-surface transition-colors">Security</span>
            <span className="cursor-pointer hover:text-on-surface transition-colors">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
