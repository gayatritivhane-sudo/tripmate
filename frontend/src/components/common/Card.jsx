import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-3xl p-space-lg shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] border border-outline-variant/20 ${
        hoverEffect ? 'hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
