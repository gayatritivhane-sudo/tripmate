import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-primary pointer-events-none flex items-center">
            {typeof icon === 'string' ? (
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            ) : (
              icon
            )}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-xl border border-outline-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5'
          } ${error ? 'border-error ring-1 ring-error' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error font-medium">{error}</p>}
    </div>
  );
}
