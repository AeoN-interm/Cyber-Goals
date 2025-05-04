import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // To redirect after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // If login is successful, store token and navigate
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful!");
        onLogin(); // Update app state or context to reflect the login

        // Redirect after login
        setTimeout(() => {
          navigate("/goals"); // Navigate to goals or any page after successful login
        }, 1500); // Delay to show the message
      }
    } catch (error) {
      // Specific error handling based on the response
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Login failed. Check your credentials.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-neon-green p-6 rounded-xl">
      <h2 className="text-2xl mb-4">🔐 Login</h2>
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
        Login
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default LoginForm;
