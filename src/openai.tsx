import { DetailedQuestion } from './pages/DetailedQuiz/DetailedQuiz';

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