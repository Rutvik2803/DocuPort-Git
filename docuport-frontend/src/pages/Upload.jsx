import { useState } from 'react';
import axios from '../api/axiosInstance';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(""); // ideally comes from auth

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
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Upload File</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your user ID"
          className="border p-2 w-full"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <input
          type="file"
          className="border p-2 w-full"
          onChange={e => setFile(e.target.files[0])}
        />
        <button className="bg-green-500 text-white py-2 px-4 rounded">Upload</button>
      </form>
    </div>
  );
}
