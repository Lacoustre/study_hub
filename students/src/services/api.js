import { auth } from '../firebase/config';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

export const tutorAPI = {
  getAllTutors: () => apiRequest('/tutors'),
  
  createBooking: (bookingData) => 
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
  
  getUserBookings: () => apiRequest('/user/bookings'),
};

export default apiRequest;