import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;