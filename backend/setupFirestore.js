const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin (using existing serviceAccountKey.json)
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
});

const db = admin.firestore();

// Sample student data matching the ProfileModal schema
const sampleStudents = [
  {
    uid: 'student1',
    email: 'alice.johnson@university.edu',
    displayName: 'Alice Johnson',
    photoURL: '',
    phone: '+1 (555) 123-4567',
    university: 'University of Technology',
    major: 'Computer Science',
    year: 'Junior',
    location: 'San Francisco, CA',
    status: 'Active',
    socials: {
      instagram: '@alicejohnson',
      twitter: '@alice_codes',
      linkedin: 'alice-johnson-dev'
    },
    role: 'student',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    uid: 'student2',
    email: 'bob.smith@university.edu',
    displayName: 'Bob Smith',
    photoURL: '',
    phone: '+1 (555) 987-6543',
    university: 'State University',
    major: 'Mathematics',
    year: 'Senior',
    location: 'New York, NY',
    status: 'Active',
    socials: {
      instagram: '@bobsmith',
      twitter: '@bob_math',
      linkedin: 'bob-smith-math'
    },
    role: 'student',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    uid: 'student3',
    email: 'carol.davis@university.edu',
    displayName: 'Carol Davis',
    photoURL: '',
    phone: '+1 (555) 456-7890',
    university: 'Tech Institute',
    major: 'Statistics',
    year: 'Sophomore',
    location: 'Austin, TX',
    status: 'Active',
    socials: {
      instagram: '@caroldavis',
      twitter: '@carol_stats',
      linkedin: 'carol-davis-stats'
    },
    role: 'student',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function setupFirestore() {
  try {
    console.log('Setting up Firestore schema and sample data...');
    
    const collectionId = process.env.STUDENTS_COLLECTION_ID || 'users';
    
    // Add sample students
    for (const student of sampleStudents) {
      await db.collection(collectionId).doc(student.uid).set(student);
      console.log(`✓ Added student: ${student.displayName}`);
    }
    
    console.log('\n✅ Firestore setup complete!');
    console.log(`Collection: ${collectionId}`);
    console.log(`Documents created: ${sampleStudents.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up Firestore:', error);
    process.exit(1);
  }
}

setupFirestore();