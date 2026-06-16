const llm = require("./langchain/llm");

const generateInterviewQuestions = async (
  analysis,
  role,
  difficulty
) => {
  const prompt = `
You are an expert technical interviewer.

Generate 10 interview questions.

Role: ${role}

Difficulty: ${difficulty}

Candidate Skills:
${analysis.skills.join(", ")}

Return ONLY valid JSON.

Format:

[
  {
    "question": "",
    "category": ""
  }
]
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
      "Interview Generation Parse Error:",
      error
    );

    return [];
  }
};

module.exports = generateInterviewQuestions;