import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Edit3, 
  Mail, 
  Phone, 
  GraduationCap,
  Calendar,
  MapPin,
  Star,
  Camera,
  Lock,
  Instagram,
  Twitter,
  Linkedin,
  Upload,
  LogOut
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { updatePassword } from 'firebase/auth';
import { logOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';


const Avatar = ({ name, photoURL, size = "md", className = "", onClick }) => {
  const sizeClasses = {
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-24 h-24"
  };
  
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${className} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} overflow-hidden`}
      onClick={onClick}
    >
      {photoURL ? (
        <img 
          src={photoURL} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-slate-900 flex items-center justify-center text-white font-bold">
          {initials}
        </div>
      )}
    </div>
  );
};


const InfoCard = React.memo(({ icon: Icon, label, value, gradient = false, editable = false, field, isEditing, onUpdate }) => {
  const displayValue = value || 'N/A';
  
  const handleChange = (e) => {
    onUpdate(field, e.target.value);
  };
  
  return (
    <div className="bg-white p-3 rounded-lg border border-slate-200">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${gradient ? 'bg-blue-600' : 'bg-slate-100'}`}>
          <Icon className={`h-4 w-4 ${gradient ? 'text-white' : 'text-slate-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
          {isEditing && editable ? (
            <input 
              type="text" 
              value={value || ''} 
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="block w-full mt-1 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-xs font-medium text-slate-900 mt-1 break-words overflow-hidden">{displayValue}</p>
          )}
        </div>
      </div>
    </div>
  );
});


const Button = ({ children, variant = "primary", fullWidth = false, className = "", onClick, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center";
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-slate-900 text-white hover:from-blue-700 hover:to-slate-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
  };
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default function ProfileModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    year: '',
    joinDate: '',
    location: '',
    status: 'Active',
    photoURL: '',
    socials: {
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser || !isOpen) return;
      
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, process.env.REACT_APP_STUDENTS_COLLECTION_ID || 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            name: userData.displayName || currentUser.displayName || 'User',
            email: userData.email || currentUser.email || '',
            phone: userData.phone || '',
            university: userData.university || '',
            major: userData.major || '',
            year: userData.year || '',
            joinDate: userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently',
            location: userData.location || '',
            status: userData.status || 'Active',
            photoURL: userData.photoURL || currentUser.photoURL || '',
            socials: {
              instagram: userData.socials?.instagram || '',
              twitter: userData.socials?.twitter || '',
              linkedin: userData.socials?.linkedin || ''
            }
          });
        } else {
          setUser({
            name: currentUser.displayName || 'User',
            email: currentUser.email || '',
            phone: '',
            university: '',
            major: '',
            year: '',
            joinDate: currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently',
            location: '',
            status: 'Active',
            photoURL: currentUser.photoURL || '',
            socials: {
              instagram: '',
              twitter: '',
              linkedin: ''
            }
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser({
          name: currentUser.displayName || 'User',
          email: currentUser.email || '',
          phone: '',
          university: '',
          major: '',
          year: '',
          joinDate: 'Recently',
          location: '',
          status: 'Active',
          photoURL: currentUser.photoURL || '',
          socials: {
            instagram: '',
            twitter: '',
            linkedin: ''
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, isOpen]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEdit = async () => {
    if (isEditing && currentUser) {
      try {
        await updateDoc(doc(db, process.env.REACT_APP_STUDENTS_COLLECTION_ID || 'users', currentUser.uid), {
          displayName: user.name,
          phone: user.phone,
          university: user.university,
          major: user.major,
          year: user.year,
          location: user.location,
          socials: user.socials,
          updatedAt: new Date()
        });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
    setIsEditing(!isEditing);
  };
  const handleProfilePictureChange = () => {
    setShowPhotoOptions(true);
  };
  const handleFileUpload = () => {
    fileInputRef.current?.click();
    setShowPhotoOptions(false);
  };
  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Camera logic would go here
      console.log('Camera access granted', stream);
      setShowPhotoOptions(false);
    } catch (error) {
      console.error('Camera access denied', error);
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && currentUser) {
      // Check file size (limit to 1MB)
      if (file.size > 1024 * 1024) {
        setNotification({ type: 'error', message: 'File size must be less than 1MB' });
        return;
      }
      
      try {
        setPhotoLoading(true);
        
        // Convert to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64String = e.target.result;
          
          try {
            // Update Firestore document with base64 image
            await updateDoc(doc(db, process.env.REACT_APP_STUDENTS_COLLECTION_ID || 'users', currentUser.uid), {
              photoURL: base64String,
              updatedAt: new Date()
            });
            
            // Update local state
            setUser(prev => ({ ...prev, photoURL: base64String }));
            
            setNotification({ type: 'success', message: 'Profile photo updated successfully!' });
          } catch (error) {
            console.error('Error saving photo:', error);
            setNotification({ type: 'error', message: 'Failed to save photo. Please try again.' });
          } finally {
            setPhotoLoading(false);
          }
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing photo:', error);
        setLoading(false);
      }
    }
  };
  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    
    if (newPassword.length < 6) {
      setNotification({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }
    
    try {
      setPasswordLoading(true);
      await updatePassword(currentUser, newPassword);
      setNotification({ type: 'success', message: 'Password updated successfully!' });
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/requires-recent-login') {
        setNotification({ type: 'error', message: 'Please log out and log back in before changing your password' });
      } else {
        setNotification({ type: 'error', message: 'Failed to update password. Please try again.' });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      onClose();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const updateUserField = (field, newValue) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUser(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: newValue
        }
      }));
    } else {
      setUser(prev => ({ ...prev, [field]: newValue }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative max-h-[95vh] sm:max-h-none overflow-y-auto">

        <div className={`relative bg-gradient-to-br from-blue-600 via-slate-800 to-slate-900 p-4 sm:p-6 ${isEditing ? 'pb-4 sm:pb-6' : 'pb-8 sm:pb-12'}`}>

          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex justify-between items-start mb-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Profile</h3>
              <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 text-yellow-300" />
                <span className="text-xs font-medium text-white">{user.status}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 hover:scale-110"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>


          <div className="text-center relative">
            <div className="relative inline-block">
              <Avatar 
                name={user.name}
                photoURL={previewPhoto || user.photoURL || currentUser?.photoURL || ''}
                size="xl" 
                className="mx-auto mb-4 ring-4 ring-white/30" 
                onClick={isEditing ? handleProfilePictureChange : undefined}
              />
              {isEditing && (
                <button 
                  onClick={handleProfilePictureChange}
                  disabled={photoLoading}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {photoLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="h-4 w-4 text-white" />
                  )}
                </button>
              )}
              <div className="absolute -bottom-1 -right-8 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            

            {showPhotoOptions && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="bg-white rounded-2xl p-6 mx-4 w-full max-w-xs">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 text-center">Change Photo</h4>
                  <div className="space-y-3">
                    <button
                      onClick={handleFileUpload}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </button>
                    <button
                      onClick={handleTakePhoto}
                      className="w-full flex items-center justify-center space-x-2 bg-slate-600 text-white py-3 rounded-xl hover:bg-slate-700 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Take Photo</span>
                    </button>
                    <button
                      onClick={() => setShowPhotoOptions(false)}
                      className="w-full py-3 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            

            {showPasswordModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 p-4">
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className="bg-white rounded-t-3xl shadow-2xl w-full max-w-md p-6"
                >
                  <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6"></div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Change Password</h4>
                    <p className="text-slate-600 text-sm">Enter your new password below</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => {
                          setShowPasswordModal(false);
                          setNewPassword('');
                          setConfirmPassword('');
                        }}
                        className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePasswordUpdate}
                        disabled={passwordLoading || !newPassword || !confirmPassword}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-slate-900 text-white rounded-xl hover:from-blue-700 hover:to-slate-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {passwordLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'Update Password'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <h4 className="text-2xl font-bold text-white mb-1">{user.name}</h4>
            <p className="text-blue-100 font-medium">{user.major || 'Student'} {user.year && `• ${user.year}`}</p>
            <div className="flex items-center justify-center space-x-4 mt-3 text-blue-100 text-sm">
              <span>Member since {user.joinDate}</span>
            </div>
          </div>
        </div>


        <div className={`p-4 sm:p-6 relative ${isEditing ? '-mt-2 sm:-mt-3' : '-mt-4 sm:-mt-6'}`}>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <InfoCard 
              icon={Mail} 
              label="Email" 
              value={user.email}
              gradient={true}
              editable={true}
              field="email"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={Phone} 
              label="Phone" 
              value={user.phone}
              editable={true}
              field="phone"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={GraduationCap} 
              label="University" 
              value={user.university}
              editable={true}
              field="university"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={Calendar} 
              label="Academic Year" 
              value={user.year}
              editable={true}
              field="year"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={MapPin} 
              label="Location" 
              value={user.location}
              editable={true}
              field="location"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={Instagram} 
              label="Instagram" 
              value={user.socials.instagram}
              editable={true}
              field="socials.instagram"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={Twitter} 
              label="Twitter" 
              value={user.socials.twitter}
              editable={true}
              field="socials.twitter"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            <InfoCard 
              icon={Linkedin} 
              label="LinkedIn" 
              value={user.socials.linkedin}
              editable={true}
              field="socials.linkedin"
              isEditing={isEditing}
              onUpdate={updateUserField}
            />
            {isEditing && (
              <button
                onClick={handlePasswordChange}
                className="group relative bg-gradient-to-br from-slate-50 to-white p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-md flex items-center space-x-3"
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-slate-900 transition-colors duration-200">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Password</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">Change Password</p>
                </div>
              </button>
            )}
          </div>
          )}


          <div className="space-y-2">
            <Button fullWidth className="group" onClick={handleEdit}>
              <Edit3 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
            <Button variant="secondary" fullWidth onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button variant="secondary" fullWidth onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
      

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}