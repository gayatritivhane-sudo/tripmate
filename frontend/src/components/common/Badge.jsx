import React from 'react';

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) {
  const variants = {
    primary: 'bg-primary-fixed text-on-primary-fixed-variant',
    secondary: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    neutral: 'bg-surface-container-high text-on-surface',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-space-sm py-1 font-label-sm text-label-sm',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-bold rounded-full ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}>
      {children}
    </span>
  );
}
