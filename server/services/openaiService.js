const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Given a goal's title and description, ask OpenAI for step-by-step recommendations.
 * @param {{ title: string, description: string }} goal
 * @returns {Promise<string[]>}
 */
async function getRecommendationsForGoal(goal) {
  const prompt = `You are a helpful assistant. A user wants to achieve this goal:\nTitle: ${goal.title}\nDescription: ${goal.description}\nPlease provide 5 concise, actionable steps the user can take to accomplish this goal.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 0.7,
    n: 1,
  });

  // Each recommendation on a new line
  const text = response.data.choices[0].text.trim();
  return text.split(/\r?\n/).filter(line => line.length > 0);
}

module.exports = { getRecommendationsForGoal };
