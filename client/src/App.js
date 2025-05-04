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

  // ← NEW: track which goal we're asking AI about
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  // Fetch goals from backend
  const fetchGoals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/goals");
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("❌ Failed to fetch goals:", err);
    }
  };

  // Load goals once on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // ← NEW: whenever the goals array changes (new goal added / deleted),
  // pick the last one in the list as the "selected" goal for recommendations.
  useEffect(() => {
    if (goals.length > 0) {
      setSelectedGoalId(goals[goals.length - 1]._id);
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
                    {/* Goal Form */}
                    <div className="bg-[#1a1a2e] border border-[#00ffe0] rounded-2xl shadow-[0_0_20px_#00ffe0] p-6">
                      <GoalForm
                        refreshGoals={fetchGoals}
                        editingGoal={editingGoal}
                        clearEditingGoal={() => setEditingGoal(null)}
                      />
                    </div>

                    {/* Goal List */}
                    <div className="bg-[#1a1a2e] border border-[#00ffe0] rounded-2xl shadow-[0_0_20px_#00ffe0] p-6">
                      <GoalList
                        goals={goals}
                        onEdit={setEditingGoal}
                        refreshGoals={fetchGoals}
                      />
                    </div>

                    {/* AI Recommendations for the selected goal */}
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
