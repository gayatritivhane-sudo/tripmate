import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-label-lg transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-[0_10px_20px_-5px_rgba(0,104,95,0.3)]',
    secondary: 'bg-secondary-fixed text-secondary hover:bg-secondary-container/30 border border-secondary/20',
    outline: 'border border-outline-variant/60 text-on-surface hover:bg-surface-container-low',
    ghost: 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low',
    danger: 'bg-error text-on-error hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-space-sm py-1 text-label-sm rounded-full',
    md: 'px-space-md py-space-xs text-label-lg rounded-full',
    lg: 'px-space-xl py-space-sm text-label-lg rounded-full',
    pill: 'px-space-md py-1.5 rounded-full text-label-sm',
    block: 'w-full py-space-xs rounded-xl text-label-md font-bold',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
