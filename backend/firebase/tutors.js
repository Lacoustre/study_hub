const admin = require('firebase-admin');
const db = admin.firestore();

const seedTutors = async () => {
  const tutors = [
    {
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
    }
  ];

  for (const tutor of tutors) {
    await db.collection('tutors').add(tutor);
  }
  
  console.log('Tutors seeded successfully');
};

module.exports = { seedTutors };