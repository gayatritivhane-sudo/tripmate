import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/Home/HomePage';
import ExplorePage from '../pages/Explore/ExplorePage';
import PlanTripPage from '../pages/PlanTrip/PlanTripPage';
import MyTripsPage from '../pages/MyTrips/MyTripsPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import AboutPage from '../pages/About/AboutPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/plan-a-trip" element={<PlanTripPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected User Routes */}
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTripsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
