// main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';

import './Dashboard.css';
import './Login.css';

function App() {
  const [userId, setUserId] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setUserId} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

