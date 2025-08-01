import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from "./Pages/Home";
import TutorSearch from "./Pages/TutorSearch";
import Messages from "./Pages/Messages";
import AuthPage from "./Pages/Auth";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><TutorSearch /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
