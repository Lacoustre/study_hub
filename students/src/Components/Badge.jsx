import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm' }) {
  const variants = {
    default: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-100',
    success: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-100',
    warning: 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-100'
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`${variants[variant]} ${sizes[size]} font-medium rounded-full border inline-block`}>
      {children}
    </span>
  );
}