// Upload.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import './Upload.css'; // Import styles

export default function Upload() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !userId) {
      alert("Please select a file and enter user ID.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

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
          type="text"
          placeholder="Enter your user ID"
          className="upload-input"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
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
