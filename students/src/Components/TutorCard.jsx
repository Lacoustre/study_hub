import React from 'react';
import { MapPinIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Avatar from './Avatar';
import Rating from './Rating';
import Badge from './Badge';
import Button from './Button';

export default function TutorCard({ tutor, index, onBookClick }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-100 relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-slate-900/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

      
      {/* Card Content */}
      <div className="p-6 relative z-10">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar name={tutor.name} verified={tutor.verified} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">{tutor.name}</h3>
                <p className="text-blue-600 font-semibold text-sm">{tutor.subject} Tutor</p>
              </div>
              <Rating rating={tutor.rating} reviews={tutor.reviews} />
            </div>
            
            {/* Quick Info */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
              <div className="flex items-center gap-1">
                <AcademicCapIcon className="h-3 w-3" />
                <span>{tutor.experience}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                <span>{tutor.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium text-sm">{tutor.availability}</span>
          </div>
          <span className="text-xs text-slate-500">Responds {tutor.responseTime}</span>
        </div>

        {/* Specialties - Compact */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {tutor.specialties.slice(0, 3).map(specialty => (
              <Badge key={specialty} size="xs">{specialty}</Badge>
            ))}
            {tutor.specialties.length > 3 && (
              <Badge variant="default" size="xs">+{tutor.specialties.length - 3}</Badge>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onBookClick(tutor)}
          fullWidth
          size="md"
        >
          Book Session
        </Button>
      </div>
    </div>
  );
}