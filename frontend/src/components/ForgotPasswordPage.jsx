// import React, { useState } from 'react';
// import axios from 'axios';
// import Navbar from './landing/Navbar';
// import Footer from './landing/Footer';

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const apiUrl = import.meta.env.VITE_API_BASE_URL;

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${apiUrl}/users/forgot-password`, { email });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage('Error: ' + err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <>
//       <Navbar />
    
   
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-cyan-600 mb-4">
//           Simplifly ERP
//         </h1>
//         <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
//           Forgot Password
//         </h2>
        
//         <p className="text-center text-sm text-gray-500 mb-4">
//           Enter your email address below, and we will send you a link to reset your password.
//         </p>
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm text-gray-600 mb-2">Email Address</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//             />
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           >
//             Send Reset Link
//           </button>
//         </form>

//         {message && (
//           <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default ForgotPasswordPage;



import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './landing/Navbar';
import Footer from './landing/Footer';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/users/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-cyan-600 mb-4">
            Simplifly ERP
          </h1>
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Forgot Password
          </h2>

          <p className="text-center text-sm text-gray-500 mb-4">
            Enter your email address below, and we will send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Send Reset Link
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes('Error') ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
