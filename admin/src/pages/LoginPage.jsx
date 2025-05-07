import { useState } from "react";
import axios from "axios";
import Admin from "../assets/admin.svg";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNotification } from "../context/NotificationProvider";

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { triggerNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/admin/login`, {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      // window.location.href = "/admin/dashboard";
      triggerNotification("Login successful!", "success");
      navigate("/admin/dashboard");
    } catch (err) {
      // alert("Login failed");
      triggerNotification(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-700 via-indigo-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background image */}
      <img
        src={Admin}
        alt="Admin Illustration"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left side image */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-black/30 p-10">
          <img src={Admin} alt="Admin" className="w-3/4 animate-pulse" />
        </div>

        {/* Right side form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-3 text-cyan-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute top-4 left-3 text-cyan-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/20 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-4 right-3 text-cyan-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition-all"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
