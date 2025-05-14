import React, { useState, useEffect } from "react";
import axios from "axios";

const Recommendations = ({ goalId }) => {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!goalId) return;

    const fetchRecs = async () => {
      setLoading(true);
      setError("");
      console.log(`🔗 Fetching recommendations for goal ${goalId}`);
      try {
        // Updated to use process.env.REACT_APP_API_URL for dynamic API URL
        const url = `${process.env.REACT_APP_API_URL}/api/goals/${goalId}/recommendations`;
        const res = await axios.get(url);
        console.log("✅ Recommendations response:", res.data);
        setRecs(res.data);
      } catch (err) {
        console.error("❌ Error fetching recommendations:", err.response || err);
        setError(
          err.response?.data?.message ||
            "Could not load recommendations. See console for details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [goalId]);

  if (!goalId) return <p className="p-4">Select a goal to see recommendations.</p>;
  if (loading)
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
      </div>
    );
  if (error) return <p className="text-red-400 p-4">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
      <ul className="list-disc list-inside space-y-1">
        {recs.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
