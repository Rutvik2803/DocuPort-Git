// import { useEffect, useState } from 'react';
// import axios from '../api/axiosInstance';
// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     axios.get('/files/')
//       .then(res => setFiles(res.data))
//       .catch(() => alert('Error fetching files'));
//   }, []);

// return (
//         <div className="p-8">
//           <h1 className="text-xl font-semibold mb-4">Your Documents</h1>
//           <ul className="space-y-2">
//            {files.map(file => (
//             <li key={file.id} className="border p-4 rounded shadow flex justify-between items-center">
//               <span>{file.filename}</span>
//               <a
//                 href={`http://localhost:8000/download/${file.filename}`} // adjust based on API
//                 className="text-blue-500 underline"
//                 target="_blank" rel="noreferrer"
//               >
//                 Download
//               </a>  
//             </li>
//         ))}
//       </ul>
//           <Link to="/upload">
//             <button className="bg-green-600 text-white px-4 py-2 rounded">
//               Upload New Document
//             </button>
//           </Link>
//         </div>
//       );
//     }       

import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState(""); // same userId used in upload

  useEffect(() => {
    if (!userId) return;

    axios.get(`/get-files/?user_id=${userId}`)
      .then(res => setFiles(res.data))
      .catch(() => alert('Error fetching files'));
  }, [userId]);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Your Documents</h1>

      <input
        type="text"
        placeholder="Enter your user ID"
        className="border p-2 mb-4 w-full"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Link to="/upload">
        <button className="bg-green-600 text-white px-4 py-2 rounded mb-6">
          Upload New Document
        </button>
      </Link>

      {files.length === 0 ? (
        <p className="text-gray-600">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {files.map(file => (
            <li
              key={file.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <span className="truncate max-w-sm">{file.filename}</span>
              <a
                href={`http://localhost:8000/download/${file.id}`}
                className="text-blue-600 hover:underline"
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

