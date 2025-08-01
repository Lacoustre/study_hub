import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Avatar({ name, size = 'md', verified = false, className = '' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-slate-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg`}>
        {initials}
      </div>
      {verified && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <CheckIcon className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
}