const llm = require("./langchain/llm");

const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert technical recruiter.

Analyze the following resume and return ONLY valid JSON.

Format:

{
  "skills": [],
  "strengths": [],
  "weaknesses": [],
  "summary": ""
}

Resume:

${resumeText}
`;
  const response = await llm.invoke(prompt);
  // console.log("GEMINI RESPONSE:");
  // console.log(response.content);

  try {
    const cleanedResponse = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);

  } catch (error) {
    console.error("Resume Analysis Parse Error:", error);

    return {
      skills: [],
      strengths: [],
      weaknesses: [],
      summary: "Analysis failed",
    };
  }
};

module.exports = analyzeResume;