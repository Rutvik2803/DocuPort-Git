import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';

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
        {!userId ? (
          <Login onLogin={handleLogin} />  // Login will be displayed only if user is not logged in
        ) : (
          <>
            <nav className="p-4 bg-blue-600 text-white flex justify-between">
              <span>Welcome, User {userId}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </nav>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
