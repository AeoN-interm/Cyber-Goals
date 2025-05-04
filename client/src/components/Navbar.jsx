import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth(); 
  const navigate = useNavigate(); // Hook to navigate after logout

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to landing page after logout
  };

  return (
    <nav className="bg-black border-b-2 border-cyan-500 p-4 shadow-md shadow-cyan-500/50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-cyan-400 text-2xl font-bold tracking-widest neon-text">
          ⚡ Cyber Goals
        </h1>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-cyan-400 text-lg font-semibold hover:text-cyan-300"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link
              to="/login"
              className="text-cyan-400 text-lg font-semibold hover:text-cyan-300 mx-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-cyan-400 text-lg font-semibold hover:text-cyan-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
