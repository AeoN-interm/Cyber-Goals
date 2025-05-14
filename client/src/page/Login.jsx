import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Login = () => {
  const { login } = useAuth(); // Use the login method from AuthContext
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the API URL to check if it is loading correctly
    console.log("API URL:", process.env.REACT_APP_API_URL);

    // Fallback if REACT_APP_API_URL is not defined
    const apiUrl = process.env.REACT_APP_API_URL || 'https://your-app-name.onrender.com'; // Replace with your Render app URL

    // Send login request to backend
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, { // Using apiUrl here
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token and update context
        login(data.token);
        // Redirect to goals page after successful login
        navigate('/goals'); // This will redirect to /goals page after login
      } else {
        setError(data.message);  // Display error message from backend
      }
    } catch (err) {
      setError('❌ An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a2e] text-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-cyan-400 neon-glow"
      >
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">🚀 Login</h2>

        <label className="block mb-3">
          <span className="text-sm text-cyan-300">Username</span>
          <input
            type="text"
            className="w-full mt-1 p-2 bg-[#0f0f1e] border border-cyan-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="block mb-5">
          <span className="text-sm text-cyan-300">Password</span>
          <input
            type="password"
            className="w-full mt-1 p-2 bg-[#0f0f1e] border border-cyan-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-md font-semibold transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
