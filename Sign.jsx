import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

function Sign() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Account Created Successfully");
    navigate("/login"); // Navigate to login page after signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-100 to-indigo-200 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 relative overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full px-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="h-4 w-4 rounded text-purple-500" />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I accept the <a href="#" className="text-purple-500 hover:underline">Terms & Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Register
          </button>
        </form>

        {/* ✅ Link outside the form */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Sign;
