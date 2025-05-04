// src/page/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Redirect to login page
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a2e] text-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-pink-400 neon-glow"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-400">🛡️ Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-3">
          <span className="text-sm text-pink-300">Username</span>
          <input
            type="text"
            className="w-full mt-1 p-2 bg-[#0f0f1e] border border-pink-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="block mb-5">
          <span className="text-sm text-pink-300">Password</span>
          <input
            type="password"
            className="w-full mt-1 p-2 bg-[#0f0f1e] border border-pink-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-semibold transition duration-200 flex justify-center items-center
            ${loading ? 'bg-pink-600 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-400'}`}
        >
          {loading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span className="ml-2">Registering...</span>
            </>
          ) : (
            'Register'
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
