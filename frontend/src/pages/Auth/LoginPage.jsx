import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTarget = searchParams.get('redirect') ? `/${searchParams.get('redirect')}` : '/my-trips';
  const isExpired = searchParams.get('expired') === 'true';

  const [formData, setFormData] = useState({
    emailOrUsername: 'alex@tripmate.com',
    password: 'password123',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFillDemo = (username, password) => {
    setFormData({ emailOrUsername: username, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      navigate(redirectTarget);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please verify and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] border border-outline-variant/30">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mx-auto mb-3">
            <span className="material-symbols-outlined text-[26px]">lock</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold">
            Welcome to TripMate
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Sign in to access your synchronized journeys and saved blueprints
          </p>
        </div>

        {isExpired && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            Your session has expired. Please sign in again.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-error/30 text-error text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email or Username"
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            value={formData.emailOrUsername}
            onChange={handleChange}
            icon="person"
            required
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon="key"
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              loading={loading}
              className="w-full h-12 text-label-lg font-bold"
            >
              Sign In
            </Button>
          </div>
        </form>

        {/* Pre-seeded demo credentials quick-fill */}
        <div className="mt-6 pt-6 border-t border-outline-variant/20">
          <p className="text-xs text-outline font-semibold uppercase tracking-wider mb-2 text-center">
            Quick Fill Demo Accounts
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('alex@tripmate.com', 'password123')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-medium text-on-surface text-center transition-colors"
            >
              Demo User (Alex)
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('admin@tripmate.com', 'password123')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-medium text-on-surface text-center transition-colors"
            >
              Admin User
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-6 text-center text-body-sm text-on-surface-variant">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
