const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addCurrentUser() {
  try {
    console.log('Enter your user details:');
    
    // You'll need to replace these with your actual details
    const userData = {
      uid: 'YOUR_FIREBASE_UID', // Get this from Firebase Auth console
      email: 'your-email@example.com',
      displayName: 'Your Name',
      photoURL: '',
      phone: '',
      university: '',
      major: '',
      year: '',
      location: '',
      status: 'Active',
      socials: {
        instagram: '',
        twitter: '',
        linkedin: ''
      },
      role: 'student',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const collectionId = process.env.STUDENTS_COLLECTION_ID || 'users';
    
    await db.collection(collectionId).doc(userData.uid).set(userData);
    console.log(`✓ Added user: ${userData.displayName}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding user:', error);
    process.exit(1);
  }
}

// Get current Firebase Auth users
async function listUsers() {
  try {
    const listUsersResult = await admin.auth().listUsers(10);
    console.log('Current Firebase Auth users:');
    listUsersResult.users.forEach((userRecord) => {
      console.log(`- UID: ${userRecord.uid}`);
      console.log(`  Email: ${userRecord.email}`);
      console.log(`  Name: ${userRecord.displayName || 'N/A'}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error listing users:', error);
  }
}

console.log('Listing current users...\n');
listUsers().then(() => {
  console.log('\nTo add yourself to Firestore:');
  console.log('1. Copy your UID from above');
  console.log('2. Edit addCurrentUser.js with your details');
  console.log('3. Run: node addCurrentUser.js');
});