import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Welcome from './pages/Welcome'; // ✅ Import Welcome page

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  const handleLogin = (id) => {
    localStorage.setItem('user_id', id);  // persist login
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setUserId(null);
  };

  return (
    <Router>
      <div>
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
          <span>{userId ? `Welcome, User ${userId}` : 'DocuPort'}</span>
          {userId && (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={userId ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/upload"
            element={userId ? <Upload /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
