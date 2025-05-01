import { useState } from "react";
import axios from "axios";
import Admin from "../assets/admin.svg"; // Corrected import for SVG image

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg">
        {/* Left side image (SVG as an image) */}
        <div className="w-1/2  lg:block bg-cyan-600 p-12 text-white flex justify-center items-center">
          <img src={Admin} alt="Admin Logo" className="w-2/3 h-auto" />
        </div>

        {/* Right side login form */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-cyan-700 mb-6">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 text-white rounded-lg mt-4 hover:bg-cyan-700 focus:outline-none"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
