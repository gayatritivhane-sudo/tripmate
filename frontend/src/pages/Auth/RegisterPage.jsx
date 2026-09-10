import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/my-trips');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
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
            <span className="material-symbols-outlined text-[26px]">person_add</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold">
            Create Your Account
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Join 120,000+ travelers unlocking hyper-personalized AI itineraries
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-error/30 text-error text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="e.g. Jordan Lee"
            value={formData.fullName}
            onChange={handleChange}
            icon="badge"
            required
          />

          <Input
            label="Username"
            id="username"
            name="username"
            type="text"
            placeholder="e.g. jordanlee"
            value={formData.username}
            onChange={handleChange}
            icon="alternate_email"
            required
          />

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="jordan@example.com"
            value={formData.email}
            onChange={handleChange}
            icon="mail"
            required
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
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
              Create Account
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-body-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
