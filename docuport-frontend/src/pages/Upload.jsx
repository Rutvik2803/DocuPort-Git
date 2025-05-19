import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext'; // ✅ import context
import './Upload.css';

export default function Upload() {
  const { user } = useAuth(); // ✅ get logged-in user
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !user) {
      alert("Please select a file and make sure you're logged in.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user.id); // ✅ automatically use user ID

    try {
      await axios.post('/upload/', formData);
      alert('Upload successful');
      setUploadSuccess(true);
    } catch (err) {
      alert('Upload failed');
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload File</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          className="upload-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>

      {uploadSuccess && (
        <div className="upload-success">
          <button onClick={goToDashboard} className="dashboard-button">
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
