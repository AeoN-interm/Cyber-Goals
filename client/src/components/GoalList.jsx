import React from 'react';
import Recommendations from './Recommendations'; // ✅ Make sure this path is correct

export default function GoalList({ goals, onEdit, refreshGoals }) {
  const handleDelete = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/goals/${id}`;
      await fetch(url, {
        method: 'DELETE',
      });
      refreshGoals();
    } catch (err) {
      console.error('💥 Delete failed:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {goals.map((goal) => (
        <div
          key={goal._id}
          className="bg-black/40 border border-cyan-500 backdrop-blur-md p-5 rounded-2xl shadow-lg shadow-cyan-400/30"
        >
          <h3 className="text-2xl font-semibold text-pink-400 neon-text">
            {goal.title}
          </h3>
          <p className="mt-2 text-cyan-100">{goal.description}</p>
          <p className="mt-2 text-sm text-cyan-300">
            📅 {goal.startDate?.slice(0, 10)} &nbsp;→&nbsp; {goal.endDate?.slice(0, 10)}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => onEdit(goal)}
              className="px-4 py-1 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(goal._id)}
              className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑 Delete
            </button>
          </div>

          {/* 👇 AI Recommendations go here */}
          <Recommendations goalId={goal._id} />
        </div>
      ))}
    </div>
  );
}
