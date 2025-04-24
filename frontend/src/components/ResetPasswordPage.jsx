// // ResetPasswordPage.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const ResetPasswordPage = ({ match }) => {
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`/api/users/reset-password/${match.params.token}`, { password });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage('Error: ' + err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPasswordPage;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams(); // Extract token from the URL
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/users/reset-password/${token}`, { password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-4">
          Simplifly ERP
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-600 mb-2">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Reset Password
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
