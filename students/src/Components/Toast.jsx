import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Toast = ({ message, type = 'error', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
          progress: 'bg-green-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
          progress: 'bg-yellow-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
          progress: 'bg-blue-500'
        };
      default:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
          progress: 'bg-red-500'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full ${styles.bg} border rounded-lg shadow-lg overflow-hidden`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {styles.icon}
              </div>
              <div className="ml-3 flex-1">
                <p className={`text-sm font-medium ${styles.text}`}>
                  {message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={onClose}
                  className={`inline-flex rounded-md p-1.5 ${styles.text} hover:bg-black hover:bg-opacity-10 transition-colors`}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          {duration > 0 && (
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className={`h-1 ${styles.progress}`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;