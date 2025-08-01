import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { tutorAPI } from '../services/api';
import { useAuth } from '../Context/AuthContext';

export default function BookingModal({ tutor, isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    if (!currentUser) {
      setError('Please sign in to book a session');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await tutorAPI.createBooking({
        tutorId: tutor.id,
        date: selectedDate,
        time: selectedTime,
        subject: tutor.subject
      });
      
      onClose();
      alert('Booking confirmed! You will receive a confirmation email shortly.');
    } catch (error) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !tutor) return null;

  // Generate calendar for next month to show available dates
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Show next month
  const currentYear = currentMonth > 11 ? today.getFullYear() + 1 : today.getFullYear();
  const adjustedMonth = currentMonth > 11 ? 0 : currentMonth;
  const firstDay = new Date(currentYear, adjustedMonth, 1);
  const lastDay = new Date(currentYear, adjustedMonth + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const calendar = [];
  const current = new Date(startDate);
  
  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    calendar.push(weekDays);
    if (current > lastDay && week >= 4) break;
  }

  const isDateAvailable = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tutor.availableDates.includes(dateStr);
  };

  const isDateTaken = (date) => {
    // Mock taken dates - in real app this would come from props
    const takenDates = ['2025-01-20', '2025-01-22'];
    const dateStr = date.toISOString().split('T')[0];
    return takenDates.includes(dateStr);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-slate-900">Book with {tutor.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Taken</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          {/* Calendar */}
          <div>
            <h4 className="text-xl font-semibold text-slate-700 mb-4 text-center">
              {new Date(currentYear, adjustedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-slate-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="space-y-1">
              {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1">
                  {week.map((date, dayIndex) => {
                    const isCurrentMonth = date.getMonth() === adjustedMonth;
                    const isPast = date < new Date().setHours(0,0,0,0);
                    const available = isDateAvailable(date);
                    const taken = isDateTaken(date);
                    const dateStr = date.toISOString().split('T')[0];
                    const isSelected = selectedDate === dateStr;
                    
                    let bgColor = 'bg-slate-100';
                    let textColor = 'text-slate-400';
                    let clickable = false;
                    
                    if (isCurrentMonth && !isPast) {
                      if (available && !taken) {
                        bgColor = isSelected ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600';
                        textColor = 'text-white';
                        clickable = true;
                      } else if (taken) {
                        bgColor = 'bg-red-500';
                        textColor = 'text-white';
                      } else {
                        bgColor = 'bg-slate-200';
                        textColor = 'text-slate-500';
                      }
                    }
                    
                    return (
                      <button
                        key={dayIndex}
                        onClick={() => clickable && setSelectedDate(dateStr)}
                        disabled={!clickable}
                        className={`h-12 w-full rounded-lg text-sm font-medium transition-colors ${
                          bgColor
                        } ${textColor} ${clickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Time Selection */}
          {selectedDate && (
            <div>
              <label className="block text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tutor.availableTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border-2 text-center font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <Button
            fullWidth
            disabled={!selectedDate || !selectedTime || loading}
            size="lg"
            className="mt-8"
            onClick={handleBooking}
            loading={loading}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}