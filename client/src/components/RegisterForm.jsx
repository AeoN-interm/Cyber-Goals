// src/components/RegisterForm.jsx
import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      setMessage("Registration successful. Please login.");
    } catch (error) {
      setMessage("Registration failed. Try a different username.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-neon-green p-6 rounded-xl">
      <h2 className="text-2xl mb-4">📝 Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-gray-800 text-white rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-gray-800 text-white rounded"
        required
      />
      <button type="submit" className="bg-neon-green text-black p-2 rounded w-full">
        Register
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default RegisterForm;