const Goal = require('../models/goal');
const { Configuration, OpenAIApi } = require("openai");

// ✅ Setup OpenAI correctly for v3.x
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ✅ Create a goal
const createGoal = async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update a goal
const updateGoal = async (req, res) => {
  try {
    const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a goal
const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ AI Recommendations using GPT-3 (text-davinci-003)
const getGoalRecommendations = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    const prompt = `Provide three smart, clear, and actionable recommendations for this goal:\n\n"${goal.name}"\n\nDescription: ${goal.description}`;

    const aiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const recommendations = aiResponse.data.choices[0].text.trim();
    res.json({ recommendations });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ message: "AI failed", error: err.message });
  }
};

// ✅ Export everything
module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getGoalRecommendations,
};
