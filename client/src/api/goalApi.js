const BASE_URL = "http://localhost:5000/api/goals";

export const getGoals = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const createGoal = async (goal) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return await res.json();
};

export const deleteGoal = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const updateGoal = async (id, updatedGoal) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGoal),
  });
  return await res.json();
};