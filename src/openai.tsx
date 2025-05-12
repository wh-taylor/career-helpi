import { DetailedQuestion } from './pages/DetailedQuiz/DetailedQuiz';
import { BasicQuestion } from './pages/BasicQuiz/BasicQuiz';

const API_KEY_STORAGE = "MYKEY"

export function getApiKey(): string | null {
  const storedKey = localStorage.getItem(API_KEY_STORAGE);
  return storedKey ? JSON.parse(storedKey) : null;
}

export async function generateNewDetailedQuestion(prevQA: DetailedQuestion[]) {
  const keyData = getApiKey();

  if (!keyData) {
    console.error("API key not found in localStorage.");
    return "API key not found.";
  }
  const prevQuestionSection = prevQA.length > 0 ?
  `Previous Questions and Answers:\n${prevQA.map((q, idx) => `${idx + 1}. Q: ${q.question}\n   A: ${q.userAnswer}`).join("\n")}\n`
  : `No previous questions have been asked yet.\n`
  const prompt = `
    ${prevQuestionSection}
    You are helping a user thoughtfully explore career paths.

    Your task:
    - Generate ONE open-ended, thoughtful question that helps the user reflect, plan, imagine, or clarify their career direction...
    - The question must be **significantly different in focus** from any of the previous ones.
    - It should **not overlap in topic** with earlier questions. Avoid the same phrasing, ideas, or themes.
    - Vary your approach across different lenses: practical planning, personal growth, creative vision, values-based dilemmas, future impact, or day-to-day work preferences.
    - Do NOT use multiple choice or list-based questions.
    - Limit to 1–2 sentences (~15–30 words).
    - Avoid questions that simply reword previous themes or use vague phrases like "passions," "dreams," or "identity" if already covered.
    - Include concrete context where possible (e.g., daily decisions, past experiences, imagined futures).

    Now, write ONE new detailed and **distinct** open-ended question.
`.trim();
  const requestBody = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: 
      `You are a thoughtful and creative career coach helping a user reflect on their values, goals, and life experiences in order to explore fulfilling career paths.

      Your job is to ask a single open-ended, thought-provoking question at a time. Each question should invite deep reflection but also remain concrete, practical, or grounded in real decisions, not abstract or repetitive.

      You must:
      - Avoid repeating themes, language, or structure from previous questions.
      - Vary the tone and focus of your questions (e.g., self-reflection, hypothetical scenarios, ethical tradeoffs, work style preferences, long-term planning, personal values).
      - Consider a wide breadth of professional and personal influences (not just job titles).
      - Ask ONE clear, concise question that fits naturally in a conversation and encourages meaningful insight.

      Stay flexible, creative, and insightful with every question.
      `.trim() },
      { role: "user", content: prompt.trim() }
    ],
    max_tokens: 150 
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + keyData
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    const newQuestion = data.choices?.[0]?.message?.content?.trim();

    return newQuestion || "Sorry, no new question was generated.";
  } catch (error) {
    console.error("Error generating detailed question:", error);
    return "Sorry, I couldn't generate a new detailed question.";
  }
}

export async function generateQuizResults(answeredQuestions: DetailedQuestion[] | BasicQuestion[]) {
  const keyData = getApiKey();

  if (!keyData) {
    console.error("API key not found in localStorage.");
    return ["API key not found."];
  }
  const answeredQuestionInput = `Previous Questions and Answers:\n${answeredQuestions.map((q, idx) => `${idx + 1}. Q: ${q.question}\n   A: ${q.userAnswer}`).join("\n")}\n`
  
  const prompt = `
    ${answeredQuestionInput}
    You are helping a user thoughtfully explore career paths.

    Your task:
    - Generate FIVE specific career paths names in an array of objects that the quiz taker can pursue based off of their answers on the quiz.
    - Give each object a title of the career, description of the career, and a reason that the career would be good for the quiz taker.
    - The career paths must be **significantly different in focus** from any of the previous ones.
    - Limit to 4 words for each path name.
    - Make it meaningful and inspiring—suitable for deep reflection on career direction.
    - Return an array of objects with each record have three attributes: A title, a description, and a reasoning.

`.trim();
const requestBody = {
  model: "gpt-4.1-nano",
  messages: [
    { role: "system", content: `You are a career expert that is helping someone determine what might be the best path for them. 
      You are unbiased and consider a wide breadth of career options. ` },
    { role: "user", content: prompt.trim() }
  ],
  max_tokens: 400,
  functions: [
    {
      name: "get_results",
      description: "Returns a list of career results",
      parameters: {
        type: "object",
        properties: {
          careers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string", description: "The title of the career"},
                description: {type: "string", description: "The description of the career"},
                reason: {type: "string", description: "The reasoning for the career"},
              },
              required: ["title", "description", "reason"],
            },
          },
        },
        required: ["careers"],
      },
    },
  ],
  function_call: { name: "get_results" },

};
try {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + keyData
    },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  console.log(data);
  console.log(JSON.parse(data.choices[0].message.function_call.arguments));
  const results = await JSON.parse(data.choices[0].message.function_call.arguments).careers;
  
  return results;
} catch (error) {
  console.error("Error generating quiz results", error);
  return ["Sorry, I couldn't generate the quiz results."];
}
}