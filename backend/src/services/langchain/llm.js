const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require('dotenv').config();
const llm = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL,
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.3,
});

module.exports = llm;