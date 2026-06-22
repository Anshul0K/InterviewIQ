const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require('dotenv').config();
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.3,
});

module.exports = llm;