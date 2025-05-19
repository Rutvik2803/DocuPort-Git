import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext'; // ✅ import context
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth(); // ✅ get logged-in user
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`/get-files/?user_id=${user.id}`)
      .then((res) => setFiles(res.data))
      .catch(() => alert('Error fetching files'));
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Documents</h1>

      <Link to="/upload">
        <button className="upload-button">Upload New Document</button>
      </Link>

      {files.length === 0 ? (
        <p className="no-files">No files uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.id} className="file-item">
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
