const llm = require("./langchain/llm");

const generateInterviewReport = async (questions) => {
  const prompt = `
You are an expert technical interviewer.

Based on the interview results below, generate a performance report.

Interview Results:

${JSON.stringify(questions, null, 2)}

Return ONLY valid JSON.

Format:

{
  "strongAreas": [],
  "weakAreas": [],
  "overallFeedback": "",
  "recommendations": []
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
      "Interview Report Parse Error:",
      error
    );

    return {
      strongAreas: [],
      weakAreas: [],
      overallFeedback: "Report generation failed",
      recommendations: [],
    };
  }
};

module.exports = generateInterviewReport;