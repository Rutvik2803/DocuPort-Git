// src/pages/Welcome.jsx
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; // ✅ Connect your styles

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome to DocuPort: An online Portfolio storage portal</h1>
        <button onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    </div>
  );
}
