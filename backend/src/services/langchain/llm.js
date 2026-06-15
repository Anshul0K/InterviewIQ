const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require('dotenv').config();
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.3,
});

module.exports = llm;