
import { GoogleGenAI, Type } from "@google/genai";
import { TestType, Answers, Question } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecommendations = async (
  testType: TestType,
  questions: Question[],
  answers: Answers
): Promise<string> => {
  const formattedAnswers = questions
    .map((q, i) => `Q: ${q}\nA: ${answers[i] || 'Not answered'}`)
    .join('\n\n');

  const prompt = `
    You are a professional career counselor AI. Based on the following ${testType} assessment answers, provide 3-5 career recommendations for a student.

    Assessment Type: ${testType}
    
    Questions and Answers:
    ${formattedAnswers}

    Provide your response as a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting or any text outside of the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: "A list of 3 to 5 career recommendations.",
              items: { type: Type.STRING }
            },
            reasoning: {
              type: Type.STRING,
              description: "A short paragraph explaining why these careers are a good fit based on the provided answers."
            }
          },
          required: ["recommendations", "reasoning"],
        },
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return JSON.stringify({
      recommendations: ["Error"],
      reasoning: "Could not generate recommendations due to an API error. Please check the console for details."
    });
  }
};
