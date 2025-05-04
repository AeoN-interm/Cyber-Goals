// client/src/components/GoalForm.jsx
import React, { useState, useEffect } from 'react';
import { createGoal, updateGoal } from '../api/goalApi';

export default function GoalForm({ refreshGoals, editingGoal, clearEditingGoal }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  // When editingGoal changes, prefill the form
  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title:     editingGoal.title     || '',
        description: editingGoal.description || '',
        startDate: editingGoal.startDate?.slice(0,10) || '',
        endDate:   editingGoal.endDate?.slice(0,10)   || ''
      });
    }
  }, [editingGoal]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔺 Submitting formData:", formData);
    try {
      let result;
      if (editingGoal) {
        result = await updateGoal(editingGoal._id, formData);
        console.log("✅ Update response:", result);
        clearEditingGoal();
      } else {
        result = await createGoal(formData);
        console.log("✅ Create response:", result);
      }
      setFormData({ title: '', description: '', startDate: '', endDate: '' });
      console.log("🔄 Calling refreshGoals()");
      refreshGoals();
    } catch (err) {
      console.error("💥 Error saving goal:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a2e] border border-[#00ffe0] rounded-2xl shadow-[0_0_20px_#00ffe0] p-6 space-y-4"
    >
      <h2 className="text-cyan-400 text-xl font-semibold neon-text">
        {editingGoal ? '✏️ Edit Goal' : '🎯 New Goal'}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Goal Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white border border-cyan-400"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white border border-cyan-400"
        rows="3"
      />

      <div className="flex gap-4">
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-cyan-400"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-cyan-400"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 rounded-xl"
        >
          {editingGoal ? '✅ Update' : '➕ Add'}
        </button>
        {editingGoal && (
          <button
            type="button"
            onClick={() => {
              clearEditingGoal();
              setFormData({ title: '', description: '', startDate: '', endDate: '' });
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl"
          >
            ✖️ Cancel
          </button>
        )}
      </div>
    </form>
  );
}
