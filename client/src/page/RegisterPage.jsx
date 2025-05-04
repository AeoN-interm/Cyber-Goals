import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    
    const { success, message } = await register(username, password); // Call register

    if (success) {
      setMessage("Registration successful!");
      setTimeout(() => {
        navigate("/"); // Redirect to login page after successful registration
      }, 1500); // Wait for a brief moment to display the success message
    } else {
      setMessage(message); // Show the error message
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl">
      <h2 className="text-2xl mb-4">🔒 Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <button type="submit" className="bg-neon-green text-black p-2 rounded w-full">
          Register
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Register;
