
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../Components';
import {
  AcademicCapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function StudentHomePage() {
  const subjects = ['CSM 157 INTRODUCTION TO STRUCTURED PROGRAM DESIGN', 'CSM 165 DISCRETE MATHEMATICS FOR COMPUTER SCIENCE I', 'MATH 161 INTRODUCTORY PURE MATHEMATICS I', 'CSM 153 CIRCUIT THEORY', 'CSM 151 INFORMATION TECHNOLOGY I', 'CSM 152 INFORMATION TECHNOLOGY II', 'CSM 158 PROGRAMMING WITH C++', 'CSM 166 DISCRETE MATHEMATICS FOR COMPUTER SCIENCE', 'MATH 162 INTRODUCTORY PURE MATHEMATICS II', 'STAT 166 PROBABILITY AND STATISTICS I'];
  const navigate = useNavigate();

  const handleFindTutor = () => {
    navigate('/search');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.querySelector('input').value;
    navigate('/search', { state: { searchQuery: searchValue } });
  };

  const handleSubjectClick = (subject) => {
    navigate('/search', { state: { selectedSubject: subject } });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans overflow-hidden">

      <div className="absolute left-0 bottom-0 h-full w-1/4 opacity-15 pointer-events-none">
        <div className="relative h-full">

          <div className="absolute bottom-4 left-4 flex space-x-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`bottom-${i}`} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-slate-600 transform rotate-45" />
            ))}
          </div>

          <div className="absolute bottom-12 left-8 flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`second-${i}`} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-slate-700 transform rotate-45" />
            ))}
          </div>

          <div className="absolute bottom-20 left-12 flex space-x-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`third-${i}`} className="w-8 h-8 bg-gradient-to-br from-blue-600 to-slate-800 transform rotate-45" />
            ))}
          </div>

          <div className="absolute bottom-28 left-16 flex space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`fourth-${i}`} className="w-8 h-8 bg-gradient-to-br from-blue-700 to-slate-900 transform rotate-45" />
            ))}
          </div>

          <div className="absolute bottom-36 left-20 flex space-x-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`fifth-${i}`} className="w-8 h-8 bg-gradient-to-br from-blue-800 to-slate-900 transform rotate-45" />
            ))}
          </div>
          <div className="absolute bottom-44 left-24">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-slate-900 transform rotate-45" />
          </div>
        </div>
      </div>


      <div className="relative z-10">
        <Navbar />


        <section
          id="home"
          className="pt-32 md:pt-40 pb-16 px-6 text-center min-h-screen flex flex-col justify-center"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight">
              <span className="block text-slate-800 mb-2">Learn Faster With</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-800 to-blue-900">
                Peer Tutors
              </span>
            </h2>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-slate-600 text-lg sm:text-xl md:text-2xl mb-6 leading-relaxed font-medium px-4">
                Connect with <span className="text-blue-600 font-semibold">verified student tutors</span> for personalized, one-on-one learning experiences across all your subjects.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm mb-8 px-4">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-700">1000+ Active Tutors</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-blue-700">50+ Subjects Available</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-slate-700 rounded-full animate-pulse"></div>
                  <span className="font-medium text-slate-700">24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mb-12">
              <motion.button
                onClick={handleFindTutor}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-slate-900 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center">
                  Start Learning Today
                  <ArrowRightIcon className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 mb-8 px-4">
              <motion.div 
                className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Verified Tutors</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <UsersIcon className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">10k+ Students</span>
              </motion.div>
            </div>

            <div className="mt-8 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for tutors, subjects, or topics..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 text-base sm:text-lg border-2 border-slate-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </motion.button>
              </form>
            </div>
          </div>
        </section>


        <section id="subjects" className="pt-16 pb-12 px-6 max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-blue-900">
            Popular Subjects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {subjects.map((subject, i) => (
              <motion.div
                key={i}
                onClick={() => handleSubjectClick(subject)}
                className="group bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 text-center border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer overflow-hidden relative"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <AcademicCapIcon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-blue-600 mb-3 sm:mb-4 group-hover:text-blue-700 transition-colors" />
                </motion.div>
                <p className="font-semibold text-xs sm:text-sm lg:text-base text-blue-900 group-hover:text-blue-700 transition-colors leading-tight">{subject}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
