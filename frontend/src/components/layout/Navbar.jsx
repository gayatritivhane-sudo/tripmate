import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/plan-a-trip', label: 'Plan a Trip' },
    { path: '/my-trips', label: 'My Trips', requiresAuth: true },
    { path: '/about', label: 'About' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
        
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-xs">
            <img
              alt="TripMate Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYBAdN6l-Io2z2IE9ZTP40HoSLkJgHdP17qe9VxEI5mnjOmfzNthf5bjPk_n3zclWJOwTkENuJ2zLCH4xFhKvwfhg5gT84dvqQ1oj8NbQ-g3gqC9AJZf8ec1hlrdxmnJfDYploUAqOHCSnv7XpvgGODSBE4Prvz2sfPxrMXbMfHYTkk1x0hkekDE6Z-u7VuVzjA4bbKUZPvi9emLWCi7CHpwi6Y2IV-WztuNPKJ-7yYMgUP-2sVExB"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              TripMate
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-space-lg">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors font-label-lg text-label-lg ${
                    active
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Auth / Action Area */}
        <div className="flex items-center gap-space-md">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container-low transition-colors"
              >
                <img
                  alt={user?.fullName || 'Profile'}
                  className="w-9 h-9 rounded-full object-cover border border-primary/30"
                  src={
                    user?.avatarUrl ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjgAdVGDCQLNyVKWYVFxqoDbMqTEwWnTQmPEFlHbdpLBlq2Ku21nfCQQwetE2bLdhp8e7GjEMs-vrQi6QGFm7yeg20WfQ9ohhHIi8EkhNdm6--n45mS8DtW4-lKtw1FmAs6i0PQ7zwHCO4OdJ0j9Vo-6IbYem8LRr9oZnZh9hGmx3ZQFdEqF6J9g6qIozJyJwj4Huzw8fgLMwit6pNiE6EpqVoLhrsFrbJEQfv59fFvXAm_Dvk9Bl-'
                  }
                />
                <span className="hidden sm:inline font-label-md text-on-surface font-semibold max-w-[120px] truncate">
                  {user?.fullName || user?.username}
                </span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-outline-variant/20">
                    <p className="font-label-md text-on-surface font-bold truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-on-surface-variant truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/my-trips"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      luggage
                    </span>
                    <span>My Trips</span>
                  </Link>
                  <Link
                    to="/plan-a-trip"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      add_circle
                    </span>
                    <span>Plan New Trip</span>
                  </Link>
                  <div className="border-t border-outline-variant/20 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-body-sm text-error hover:bg-red-50 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-block font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors px-space-xs py-space-2xs"
              >
                Login
              </Link>
              <Link
                to="/plan-a-trip"
                className="inline-flex items-center justify-center px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container shadow-[0_10px_20px_-5px_rgba(0,104,95,0.3)] transition-all"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container-low"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-margin-mobile py-space-md space-y-space-xs shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl font-label-lg ${
                isActive(link.path)
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-primary font-bold"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
