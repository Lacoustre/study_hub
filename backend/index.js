const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin
let credential;
if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL) {
  credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });
  console.log('Using Firebase credentials from environment variables');
} else {
  console.error('Firebase initialization failed: Environment variables missing');
  console.error('Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
  process.exit(1);
}

admin.initializeApp({
  credential,
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://doreen-707c4-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/api/tutors', async (req, res) => {
  try {
    const tutorsSnapshot = await db.collection('tutors').get();
    const tutors = tutorsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings', verifyToken, async (req, res) => {
  try {
    const { tutorId, date, time, subject } = req.body;
    const booking = {
      studentId: req.user.uid,
      tutorId,
      date,
      time,
      subject,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('bookings').add(booking);
    res.json({ id: docRef.id, ...booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user/bookings', verifyToken, async (req, res) => {
  try {
    const bookingsSnapshot = await db.collection('bookings')
      .where('studentId', '==', req.user.uid)
      .get();
    
    const bookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});