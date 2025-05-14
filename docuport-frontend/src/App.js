import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Welcome from './pages/Welcome';

function AppRoutes() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get the current route path

  const handleHome = () => {
    navigate('/');
  };

  const handleLogin = (id) => {
    localStorage.setItem('user_id', id);
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setUserId(null);
    navigate('/');
  };

  return (
    <div>
      {/* 👇 Conditionally render the navbar only if not on the Welcome page */}
      {location.pathname !== '/' && (
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
          <span>{userId ? `Welcome, User ${userId}` : 'DocuPort'}</span>

          <div className="flex gap-2">
            <button
              onClick={handleHome}
              className="bg-green-500 px-3 py-1 rounded"
            >
              Home
            </button>

            {userId && (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={userId ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/upload" element={userId ? <Upload /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
