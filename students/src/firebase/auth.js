import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Email/Password Authentication
export const signUpWithEmail = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, { displayName: fullName });
    
    // Create user document with complete schema
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: fullName,
      photoURL: user.photoURL || '',
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
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    try {
      await setDoc(doc(db, process.env.REACT_APP_STUDENTS_COLLECTION_ID || 'users', user.uid), userData);
      console.log('✓ User document created successfully');
    } catch (firestoreError) {
      console.error('Failed to create user document:', firestoreError);
      // Continue with authentication even if Firestore write fails
    }
    
    return user;
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw error;
  }
};

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Try to create/update user document
    try {
      const userDoc = await getDoc(doc(db, process.env.REACT_APP_STUDENTS_COLLECTION_ID || 'users', user.uid));
      if (!userDoc.exists()) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || '',
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
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await setDoc(doc(db, process.env.REACT_APP_STUDENTS_COLLECTION_ID || 'users', user.uid), userData);
        console.log('✓ User document created successfully');
      }
    } catch (firestoreError) {
      console.error('Failed to create user document:', firestoreError);
      // Continue with authentication even if Firestore write fails
    }
    
    return user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};



// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};