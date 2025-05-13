// Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // External CSS file

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState(""); // Same userId used in upload

  useEffect(() => {
    if (!userId) return;

    axios.get(`/get-files/?user_id=${userId}`)
      .then(res => setFiles(res.data))
      .catch(() => alert('Error fetching files'));
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Documents</h1>

      <input
        type="text"
        placeholder="Enter your user ID"
        className="input-userid"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Link to="/upload">
        <button className="upload-button">
          Upload New Document
        </button>
      </Link>

      {files.length === 0 ? (
        <p className="no-files">No files uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {files.map(file => (
            <li
              key={file.id}
              className="file-item"
            >
              <span className="file-name">{file.filename}</span>
              <a
                href={`http://localhost:8000/download/${file.id}`}
                className="file-download-link"
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
