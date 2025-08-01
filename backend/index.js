const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin
let credential;
// Temporarily disabled environment variables - using serviceAccountKey.json instead
// if (process.env.FIREBASE_PRIVATE_KEY) {
//   credential = admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
//   });
// } else {
  const serviceAccount = require('./serviceAccountKey.json');
  credential = admin.credential.cert(serviceAccount);
// }

admin.initializeApp({
  credential,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
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