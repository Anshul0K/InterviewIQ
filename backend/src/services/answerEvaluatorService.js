const llm = require("./langchain/llm");

const evaluateAnswer = async (
  question,
  answer
) => {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Answer:
${answer}

Return ONLY valid JSON.

Format:

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "improvements": []
}
`;

  const response = await llm.invoke(prompt);

  try {

    const cleanedResponse = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);

  } catch (error) {

    console.error(
      "Answer Evaluation Parse Error:",
      error
    );

    return {
      score: 0,
      feedback: "Evaluation failed",
      strengths: [],
      improvements: [],
    };
  }
};

module.exports = evaluateAnswer;