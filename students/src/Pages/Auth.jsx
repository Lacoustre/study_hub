import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '../firebase/auth';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setError('');
    setFormData({ fullName: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/popup-blocked':
        return 'Popup was blocked. Please allow popups and try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled. Please contact support.';
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please check your email and password.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignIn) {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.fullName);
      }
      navigate('/');
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };



  const inputStyle =
    'w-full p-3 rounded-lg border border-slate-300 focus:outline-blue-600 bg-white text-base';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center md:w-1/2 bg-blue-950 text-white px-6 lg:px-8 py-8 lg:py-12 transition duration-500">
          <h2 className="text-4xl font-bold mb-4">
            {isSignIn ? 'Welcome Back!' : 'Join Us Today!'}
          </h2>
          <p className="text-center mb-6">
            {isSignIn
              ? 'Welcome to your peer tutoring platform. Connect with fellow students and continue your learning journey.'
              : 'Join thousands of students connecting with verified peer tutors across computer science, mathematics, and statistics courses.'}
          </p>
          {!isSignIn && (
            <div className="text-center text-sm space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>1000+ Active Student Tutors</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Specialized in CSM, MATH & STAT Courses</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Affordable Peer-to-Peer Learning</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignIn ? 'signIn' : 'signUp'}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-blue-950 mb-2">
                {isSignIn ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-slate-600 text-base mb-4 sm:mb-6">
                {isSignIn
                  ? 'Welcome back! Access your tutoring dashboard and continue learning.'
                  : 'Create your account to connect with peer tutors and boost your academic performance.'}
              </p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 flex items-start gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5">
                    <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </div>
                  <div>{error}</div>
                </motion.div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isSignIn && (
                  <div>
                    <label className="block text-left text-base font-bold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={inputStyle}
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-left text-base font-bold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label className="block text-left text-base font-bold text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={inputStyle}
                    required
                  />
                </div>
                {isSignIn && (
                  <div className="text-right text-base">
                    <button className="text-blue-600">
                      Forgot Password?
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-2 rounded-lg bg-blue-950 text-white font-semibold hover:bg-blue-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {loading ? 'Please wait...' : (isSignIn ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-grow h-px bg-slate-300" />
                <span className="text-base text-slate-500">or continue with</span>
                <div className="flex-grow h-px bg-slate-300" />
              </div>

              <div className="flex justify-center">
                <button 
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition duration-300"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FcGoogle size={20} />
                  )}
                  <span className="text-base">{loading ? 'Signing in...' : 'Google'}</span>
                </button>
              </div>

              <p className="text-base mt-4 sm:mt-6 text-center text-slate-500">
                {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  className="text-blue-600"
                  onClick={toggleMode}
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
