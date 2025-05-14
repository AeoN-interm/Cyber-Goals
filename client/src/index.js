// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // Optional, can be removed if not needed

// ✅ Import the AuthProvider
import { AuthProvider } from './context/AuthContext';

// ✅ Create root with React 18+ method
const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Render with AuthProvider wrapping the App
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// ✅ Optional performance monitoring
reportWebVitals(); // Can be removed if not needed
