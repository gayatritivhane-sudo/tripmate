import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm">
        <span className="font-display text-6xl text-primary font-extrabold block mb-2">404</span>
        <h2 className="font-headline-md text-on-surface font-bold mb-2">Destination Off Course</h2>
        <p className="font-body-md text-on-surface-variant mb-6">
          The page you are looking for has departed or moved to an uncharted coordinate.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
