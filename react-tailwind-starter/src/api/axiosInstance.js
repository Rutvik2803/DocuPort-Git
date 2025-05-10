// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // your Django backend
  withCredentials: true,            // send cookies for session-based login
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post('/login/', { email, password });
    alert('Login successful');
    onLogin(res.data.user_id);  // Call the login handler
    navigate('/dashboard');     // Redirect after login
  } catch (err) {
    alert('Login failed');
  }
};
