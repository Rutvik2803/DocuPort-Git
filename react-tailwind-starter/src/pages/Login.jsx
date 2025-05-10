import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom'; // already imported

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ STEP 1: Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login/', { email, password });
      alert('Login successful');
      onLogin(res.data.user_id);          // call login handler
      navigate('/dashboard');             // ✅ STEP 2: Redirect after login
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="email" placeholder="Email"
          className="w-full border p-2 mb-4"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
