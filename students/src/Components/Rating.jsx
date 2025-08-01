import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

export default function Rating({ rating, reviews, size = 'sm', showReviews = true }) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base'
  };

  return (
    <div className="flex items-center gap-1">
      <StarIcon className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
      <span className={`${textSizes[size]} font-semibold text-slate-700`}>{rating}</span>
      {showReviews && (
        <span className={`${size === 'xs' ? 'text-xs' : 'text-xs'} text-slate-500`}>({reviews})</span>
      )}
    </div>
  );
}