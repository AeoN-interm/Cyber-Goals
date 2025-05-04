// src/pages/Landing.js
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#0f0c29] to-[#302b63] text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Cyber Goals</h1>
      <div className="flex gap-4">
        <Link to="/login" className="bg-cyan-500 px-6 py-2 rounded-md hover:bg-cyan-400">
          Login
        </Link>
        <Link to="/register" className="bg-cyan-500 px-6 py-2 rounded-md hover:bg-cyan-400">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
