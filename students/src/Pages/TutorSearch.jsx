import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Navbar, Footer, TutorCard, BookingModal, SearchFilters, Button } from '../Components';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { tutorAPI } from '../services/api';

export default function TutorSearch() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      if (location.state.searchQuery) {
        setSearchQuery(location.state.searchQuery);
      }
      if (location.state.selectedSubject) {
        setSelectedSubject(location.state.selectedSubject);
      }
    }
  }, [location.state]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await tutorAPI.getAllTutors();
        setTutors(data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
        // Fallback to static data if API fails
        setTutors(staticTutors);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const subjects = ['CSM 157 INTRODUCTION TO STRUCTURED PROGRAM DESIGN', 'CSM 165 DISCRETE MATHEMATICS FOR COMPUTER SCIENCE I', 'MATH 161 INTRODUCTORY PURE MATHEMATICS I', 'CSM 153 CIRCUIT THEORY', 'CSM 151 INFORMATION TECHNOLOGY I', 'CSM 152 INFORMATION TECHNOLOGY II', 'CSM 158 PROGRAMMING WITH C++', 'CSM 166 DISCRETE MATHEMATICS FOR COMPUTER SCIENCE', 'MATH 162 INTRODUCTORY PURE MATHEMATICS II', 'STAT 166 PROBABILITY AND STATISTICS I'];
  
  const staticTutors = [
    {
      id: 1,
      name: 'Kofi Asante',
      subject: 'CSM 157 INTRODUCTION TO STRUCTURED PROGRAM DESIGN',
      rating: 4.9,
      reviews: 127,
      location: 'Online',
      experience: '3 years',
      avatar: 'KA',
      specialties: ['C Programming', 'Data Structures', 'Algorithm Design'],
      availability: 'Available now',
      verified: true,
      responseTime: '< 1 hour',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-20', '2025-01-22', '2025-01-23', '2025-01-25', '2025-01-27', '2025-01-29', '2025-01-30'],
      availableTimes: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']
    },
    {
      id: 2,
      name: 'Ama Serwaa',
      subject: 'CSM 165 DISCRETE MATHEMATICS FOR COMPUTER SCIENCE I',
      rating: 4.8,
      reviews: 89,
      location: 'Online',
      experience: '4 years',
      avatar: 'AS',
      specialties: ['Logic', 'Set Theory', 'Graph Theory'],
      availability: 'Available today',
      verified: true,
      responseTime: '< 2 hours',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-18', '2025-01-19', '2025-01-21', '2025-01-23', '2025-01-24', '2025-01-26', '2025-01-28', '2025-01-31'],
      availableTimes: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
    },
    {
      id: 3,
      name: 'Kwabena Mensah',
      subject: 'MATH 161 INTRODUCTORY PURE MATHEMATICS I',
      rating: 4.9,
      reviews: 156,
      location: 'Online',
      experience: '2 years',
      avatar: 'KM',
      specialties: ['Calculus', 'Linear Algebra', 'Mathematical Proofs'],
      availability: 'Available now',
      verified: true,
      responseTime: '< 30 min',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-20', '2025-01-21', '2025-01-24', '2025-01-25', '2025-01-27', '2025-01-29', '2025-01-31'],
      availableTimes: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM']
    },
    {
      id: 4,
      name: 'Adwoa Boateng',
      subject: 'CSM 153 CIRCUIT THEORY',
      rating: 4.7,
      reviews: 203,
      location: 'Online',
      experience: '5 years',
      avatar: 'AB',
      specialties: ['Digital Circuits', 'Logic Gates', 'Circuit Analysis'],
      availability: 'Available tomorrow',
      verified: true,
      responseTime: '< 3 hours',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-21', '2025-01-22', '2025-01-24', '2025-01-28', '2025-01-30'],
      availableTimes: ['9:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']
    },
    {
      id: 5,
      name: 'Kwaku Osei',
      subject: 'CSM 151 INFORMATION TECHNOLOGY I',
      rating: 4.8,
      reviews: 94,
      location: 'Online',
      experience: '3 years',
      avatar: 'KO',
      specialties: ['Computer Systems', 'Networking', 'Database Basics'],
      availability: 'Available now',
      verified: true,
      responseTime: '< 1 hour',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-19', '2025-01-20', '2025-01-22', '2025-01-23', '2025-01-26', '2025-01-29', '2025-01-31'],
      availableTimes: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']
    },
    {
      id: 6,
      name: 'Akua Afriyie',
      subject: 'CSM 152 INFORMATION TECHNOLOGY II',
      rating: 4.9,
      reviews: 178,
      location: 'Online',
      experience: '4 years',
      avatar: 'AA',
      specialties: ['Advanced Networking', 'System Administration', 'Security'],
      availability: 'Available today',
      verified: true,
      responseTime: '< 2 hours',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-21', '2025-01-23', '2025-01-25', '2025-01-27', '2025-01-30'],
      availableTimes: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
    },
    {
      id: 7,
      name: 'Yaw Owusu',
      subject: 'CSM 158 PROGRAMMING WITH C++',
      rating: 4.7,
      reviews: 112,
      location: 'Online',
      experience: '2 years',
      avatar: 'YO',
      specialties: ['Object-Oriented Programming', 'STL', 'Memory Management'],
      availability: 'Available now',
      verified: true,
      responseTime: '< 1 hour',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-20', '2025-01-22', '2025-01-24', '2025-01-26', '2025-01-28', '2025-01-31'],
      availableTimes: ['10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM', '6:00 PM']
    },
    {
      id: 8,
      name: 'Abena Gyimah',
      subject: 'CSM 166 DISCRETE MATHEMATICS FOR COMPUTER SCIENCE',
      rating: 4.8,
      reviews: 145,
      location: 'Online',
      experience: '3 years',
      avatar: 'AG',
      specialties: ['Combinatorics', 'Number Theory', 'Boolean Algebra'],
      availability: 'Available now',
      verified: true,
      responseTime: '< 1 hour',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-18', '2025-01-19', '2025-01-21', '2025-01-23', '2025-01-25', '2025-01-27', '2025-01-28', '2025-01-30'],
      availableTimes: ['9:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '5:00 PM']
    },
    {
      id: 9,
      name: 'Kojo Nkrumah',
      subject: 'MATH 162 INTRODUCTORY PURE MATHEMATICS II',
      rating: 4.9,
      reviews: 167,
      location: 'Online',
      experience: '4 years',
      avatar: 'KN',
      specialties: ['Advanced Calculus', 'Real Analysis', 'Abstract Algebra'],
      availability: 'Available today',
      verified: true,
      responseTime: '< 2 hours',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-19', '2025-01-20', '2025-01-22', '2025-01-24', '2025-01-26', '2025-01-28', '2025-01-31'],
      availableTimes: ['8:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM']
    },
    {
      id: 10,
      name: 'Akosua Frimpong',
      subject: 'STAT 166 PROBABILITY AND STATISTICS I',
      rating: 4.8,
      reviews: 134,
      location: 'Online',
      experience: '3 years',
      avatar: 'AF',
      specialties: ['Probability Theory', 'Statistical Analysis', 'Hypothesis Testing'],
      availability: 'Available now',
      verified: true,
      responseTime: '< 1 hour',
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-20', '2025-01-21', '2025-01-23', '2025-01-25', '2025-01-27', '2025-01-29'],
      availableTimes: ['10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '6:00 PM']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-950 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading tutors...</p>
        </div>
      </div>
    );
  }

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = !searchQuery || 
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = !selectedSubject || tutor.subject === selectedSubject;
    

    
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="pt-32 md:pt-40 pb-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
              Find Your Perfect Tutor
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Connect with verified student tutors who understand your learning style
            </p>
          </motion.div>
        </div>

        <SearchFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          subjects={subjects}
        />

        {/* Results */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredTutors.length} Tutors Available
            </h2>
            <div className="flex items-center gap-2 text-slate-600">
              <FunnelIcon className="h-5 w-5" />
              <span>Sort by: Relevance</span>
            </div>
          </div>

          {/* Tutor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor, index) => (
              <TutorCard 
                key={tutor.id}
                tutor={tutor}
                index={index}
                onBookClick={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowBookingModal(true);
                }}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="secondary"
              size="lg"
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 2000);
              }}
              className="min-w-[200px]"
            >
              Load More Tutors
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      
      <BookingModal 
        tutor={selectedTutor}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}