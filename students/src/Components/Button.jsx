import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-slate-900 hover:from-blue-700 hover:to-slate-800 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    outline: 'border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const baseClasses = `font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 ${loading ? 'cursor-wait' : 'disabled:cursor-not-allowed'} ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner size="sm" color="white" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}