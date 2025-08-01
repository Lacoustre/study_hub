const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addYourUsers() {
  try {
    const users = [
      {
        uid: '90gABL7FECPsfEqzJTg1oWchMwk1',
        email: 'akomanyibernard401@gmail.com',
        displayName: 'Ber Nard',
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
      },
      {
        uid: 'TWlFThjqLeYdxMFyp0a6tyDQd4V2',
        email: 'oseibernard401@gmail.com',
        displayName: 'Bernard Akomanyi',
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
      }
    ];
    
    const collectionId = process.env.STUDENTS_COLLECTION_ID || 'users';
    
    for (const user of users) {
      await db.collection(collectionId).doc(user.uid).set(user);
      console.log(`✓ Added user: ${user.displayName} (${user.email})`);
    }
    
    console.log('\n✅ All users added to Firestore collection!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding users:', error);
    process.exit(1);
  }
}

addYourUsers();