const express = require('express');
const router = express.Router();

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getGoalRecommendations, 
} = require('../controllers/goalController');

// Create a goal
router.post('/', createGoal);

// Get all goals
router.get('/', getGoals);

// Update a goal
router.put('/:id', updateGoal);

// Delete a goal  
router.delete('/:id', deleteGoal);

// ✅ Get AI recommendations for a goal
router.get('/:id/recommendations', getGoalRecommendations);

// ✅ Optional test route
router.get('/test', (req, res) => {
  res.json({ message: "Goals route working!" });
});

module.exports = router;
