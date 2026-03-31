import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Admin login
    if (email === "admin@bus.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/dashboard"); // Redirect to admin dashboard
      return;
    }

    // ✅ Regular user login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("No account found. Please Sign Up first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("LoggedIn", "true");
      window.dispatchEvent(new Event("authChange"));
      navigate("/"); // Redirect to Home Page
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-100 to-indigo-200 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-purple-600 text-center mb-6">Sign In</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Welcome back! Please enter your details to continue.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 font-semibold transition-colors"
          >
            Sign In
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/sign" className="text-purple-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
