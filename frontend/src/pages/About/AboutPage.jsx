import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-2xl">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-space-3xl">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-space-2xs">
          Our Philosophy
        </span>
        <h1 className="font-display text-[32px] md:text-headline-lg text-on-surface font-extrabold tracking-tight">
          Reinventing Travel Through Intelligent Simplicity
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 leading-relaxed">
          TripMate was born from a fundamental frustration: planning a memorable journey shouldn&apos;t demand 30 open browser tabs, fractured group chats, and guesswork.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl mb-space-3xl">
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined text-[28px]">explore</span>
          </div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-2">Curated Authenticity</h3>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            We bypass tourist traps to bring you quiet temple paths, verified Wi-Fi cafes, and artisanal neighborhood bistros vetted by local insiders.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary mb-4">
            <span className="material-symbols-outlined text-[28px]">speed</span>
          </div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-2">Algorithmic Precision</h3>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            Our AI engine optimizes geographic walking clusters, calculates realistic transit buffers, and adjusts to your personal energy rhythm.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-4">
            <span className="material-symbols-outlined text-[28px]">groups</span>
          </div>
          <h3 className="font-headline-sm text-on-surface font-bold mb-2">Harmonious Collaboration</h3>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            Travel is better together. Synchronize dates, vote on restaurant options, and maintain total clarity across multi-traveler groups.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 md:p-12 rounded-3xl bg-surface-container text-center max-w-2xl mx-auto">
        <h3 className="font-headline-md text-on-surface font-bold mb-3">
          Ready to experience frictionless travel?
        </h3>
        <p className="font-body-md text-on-surface-variant mb-6">
          Join thousands of modern voyagers and build your first AI-crafted itinerary in under a minute.
        </p>
        <Link
          to="/plan-a-trip"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-on-primary font-label-lg font-bold hover:bg-primary-container shadow-md"
        >
          <span>Get Started with TripMate</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
