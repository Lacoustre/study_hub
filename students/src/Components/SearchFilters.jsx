import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchFilters({ 
  searchQuery, 
  setSearchQuery, 
  selectedSubject, 
  setSelectedSubject, 
  subjects 
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tutors, subjects, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}