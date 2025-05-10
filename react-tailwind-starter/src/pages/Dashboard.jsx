import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

export default function Dashboard() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/files/')
      .then(res => setFiles(res.data))
      .catch(() => alert('Error fetching files'));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Documents</h1>
      <ul className="space-y-2">
        {files.map(file => (
          <li key={file.id} className="border p-4 rounded shadow flex justify-between items-center">
            <span>{file.filename}</span>
            <a
              href={`http://localhost:8000/download/${file.filename}`} // adjust based on API
              className="text-blue-500 underline"
              target="_blank" rel="noreferrer"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
