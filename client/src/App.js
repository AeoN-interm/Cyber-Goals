// client/src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Recommendations from "./components/Recommendations";
import Login from "./page/Login";
import Register from "./page/Register";
import Landing from "./page/Landing";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  // Fetch goals from backend using environment variable
  const fetchGoals = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/goals`);
      if (!res.ok) throw new Error("Failed to fetch goals");
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("❌ Failed to fetch goals:", err.message);
    }
  };

  // Load goals once on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Automatically select the last goal for AI recommendations
  useEffect(() => {
    if (goals.length > 0) {
      setSelectedGoalId(goals[0]._id);
    }
  }, [goals]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0c29] to-[#302b63] text-white font-mono">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/goals"
              element={
                <PrivateRoute>
                  <div className="max-w-4xl mx-auto mt-10 px-4 space-y-8">
                    <div className="bg-[#1a1a2e] border border-[#00ffe0] rounded-2xl shadow-[0_0_20px_#00ffe0] p-6">
                      <GoalForm
                        refreshGoals={fetchGoals}
                        editingGoal={editingGoal}
                        clearEditingGoal={() => setEditingGoal(null)}
                      />
                    </div>

                    <div className="bg-[#1a1a2e] border border-[#00ffe0] rounded-2xl shadow-[0_0_20px_#00ffe0] p-6">
                      <GoalList
                        goals={goals}
                        onEdit={setEditingGoal}
                        refreshGoals={fetchGoals}
                      />
                    </div>

                    <Recommendations goalId={selectedGoalId} />
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
