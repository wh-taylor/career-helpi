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

    You are helping a user thoughtfully explore career paths based on their quiz responses.

    Your task:
    - Generate FIVE specific and distinct career paths the quiz taker might pursue.
    - Each career should be significantly different in focus from the others.
    - For each career, return the following:
      - Title (max 4 words)
      - A brief description of what the career involves
      - A personalized reason this career would be a good fit for the quiz taker
      - The typical salary range in the U.S. (in dollars per year)
      - The projected job outlook (e.g., growing, stable, declining)
      - Common employers or industries that hire for this role

    Output this information as an array of objects, one for each career.
  `.trim();

  const requestBody = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a career expert helping someone explore their future path based on quiz results. You provide thoughtful, data-informed insights across diverse fields.`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 100,
    functions: [
      {
        name: "get_results",
        description: "Returns a list of detailed career results",
        parameters: {
          type: "object",
          properties: {
            careers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string", description: "The title of the career" },
                  description: { type: "string", description: "The description of the career" },
                  reason: { type: "string", description: "Why this career is a good fit for the user" },
                  salaryRange: { type: "string", description: "Typical U.S. salary range (e.g. $60,000–$90,000)" },
                  jobOutlook: { type: "string", description: "Future job outlook (e.g. growing, stable, declining)" },
                  commonEmployers: { type: "string", description: "Common employers or industries hiring for this role" }
                },
                required: ["title", "description", "reason", "salaryRange", "jobOutlook", "commonEmployers"]
              }
            }
          },
          required: ["careers"]
        }
      }
    ],
    function_call: { name: "get_results" }
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
    const results = JSON.parse(data.choices[0].message.function_call.arguments).careers;

    return results;
  } catch (error) {
    console.error("Error generating quiz results", error);
    return ["Sorry, I couldn't generate the quiz results."];
  }
}