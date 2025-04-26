// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/landing/Navbar";
// import Footer from "../components/landing/Footer";
// import { useNotification } from "../context/NotificationProvider";
// import { useAuth } from "../context/AuthContext";

// const LoginPage = () => {
//   const { triggerNotification } = useNotification();
//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post(`${apiUrl}/users/login`, formData, {
//         withCredentials: true,
//       });
//       console.log("Login Success ✅", res.data);

//       // Extract user data from the response
//       const { userId, firstName, lastName, email, phone } = res.data.user;

//       // Set user in context ✅
//       login(res.data.user);

//       // Store user data in sessionStorage
//       sessionStorage.setItem("userId", userId);
//       sessionStorage.setItem(
//         "userProfile",
//         JSON.stringify({ firstName, lastName, email, phone })
//       );
//       sessionStorage.setItem("userProfile", JSON.stringify(res.data.user));
//       localStorage.setItem("profileImageUrl", res.data.user.imageUrl);

//       // Store the token and user data in localStorage
//       localStorage.setItem("token", res.data.token);
//       // localStorage.setItem("token", token);
//       // console.log("Saved token ✅", localStorage.getItem("token"));

//       console.log("Full login response:", res.data);

//       triggerNotification({
//         type: "success",
//         message: "Login successful!",
//       });

//       // Redirect after successful login
//       navigate("/dashboard"); // change to your desired page
//     } catch (err) {
//       console.error("Login Failed ❌", err);
//       setError(err.response?.data?.message || "Login failed.");

//       triggerNotification({
//         type: "error",
//         message: errorMsg,
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="flex-grow flex items-center justify-center mt-24 mb-9 px-4">
//         <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
//           <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
//             Login
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
//                 placeholder="••••••••"
//               />
//                <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? "Hide" : "Show"} {/* Toggle button text */}
//               </button>
//             </div>

//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//             <button
//               type="submit"
//               className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-md transition duration-300"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-sm text-center text-gray-500 mt-6">
//             Don’t have an account?{" "}
//             <a href="/register" className="text-cyan-600 hover:underline">
//               Register here
//             </a>
//           </p>

//           {/* <p className="text-sm text-center text-gray-500 mt-6">
//            Y
//             <a href="/forgot-password" className="text-cyan-600 hover:underline">
//               Forget password
//             </a>
//           </p> */}
//           <p className="text-sm text-center text-gray-500 mt-6">
//             Forgot your password?{" "}
//             <a
//               href="/forgot-password"
//               className="text-cyan-600 hover:underline"
//             >
//               Click here to reset it
//             </a>
//           </p>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { useNotification } from "../context/NotificationProvider";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { triggerNotification } = useNotification();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${apiUrl}/users/login`, formData, {
        withCredentials: true,
      });
      console.log("Login Success ✅", res.data);

      // Extract user data from the response
      const { userId, firstName, lastName, email, phone } = res.data.user;

      // Set user in context ✅
      login(res.data.user);

      // Store user data in sessionStorage
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem(
        "userProfile",
        JSON.stringify({ firstName, lastName, email, phone })
      );
      sessionStorage.setItem("userProfile", JSON.stringify(res.data.user));
      localStorage.setItem("profileImageUrl", res.data.user.imageUrl);

      // Store the token and user data in localStorage
      localStorage.setItem("token", res.data.token);
      // console.log("Saved token ✅", localStorage.getItem("token"));

      console.log("Full login response:", res.data);

      triggerNotification({
        type: "success",
        message: "Login successful!",
      });

      // Redirect after successful login
      navigate("/dashboard"); // change to your desired page
    } catch (err) {
      console.error("Login Failed ❌", err);
      setError(err.response?.data?.message || "Login failed.");

      triggerNotification({
        type: "error",
        message: errorMsg,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center mt-24 mb-9 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute right-3 top-[67%]  -translate-y-1/2 text-gray-500 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2 hover:shadow-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-cyan-600 hover:underline">
              Register here
            </a>
          </p>

          {/* <p className="text-sm text-center text-gray-500 mt-6">
           Y
            <a href="/forgot-password" className="text-cyan-600 hover:underline">
              Forget password
            </a>
          </p> */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-cyan-600 hover:underline"
            >
              Click here to reset it
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
