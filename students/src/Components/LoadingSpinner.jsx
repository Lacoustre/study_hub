import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', color = 'blue' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colors = {
    blue: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-600 border-t-transparent'
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 ${colors[color]} rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}