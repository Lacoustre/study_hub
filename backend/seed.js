const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

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
    availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-20'],
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
    availableDates: ['2025-01-15', '2025-01-16', '2025-01-18', '2025-01-19', '2025-01-21'],
    availableTimes: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
  }
];

const seedTutors = async () => {
  try {
    for (const tutor of tutors) {
      await db.collection('tutors').add(tutor);
    }
    console.log('Tutors seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tutors:', error);
    process.exit(1);
  }
};

seedTutors();