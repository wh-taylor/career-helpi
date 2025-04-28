import { Question } from './pages/DetailedQuiz/DetailedQuiz';

const API_KEY_STORAGE = "MYKEY"

export function getApiKey(): string | null {
  const storedKey = localStorage.getItem(API_KEY_STORAGE);
  return storedKey ? JSON.parse(storedKey) : null;
}

const APIBody = {
    "model": "gpt-4.1-nano",
    "messages": [
      {
        "role": "user",
        "content": "Write one sentence about a frog."
      }
    ],
    "max_tokens": 10
  }

  async function callOpenAiAPI(keyData: string, prompt: string) {
    console.log("Calling the OpenAI API")
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + keyData
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
    });
  }

export async function generateNewDetailedQuestion(prevQA: Question[]) {
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

    Guidelines:
    - Generate one **open-ended** quiz question.
    - It should encourage the user to reflect on their interests, strengths, values, or goals.
    - It must NOT be a multiple-choice question.
    - Make it inspiring, serious, and about career exploration.
    - Avoid repeating or rephrasing earlier questions.
    - Limit to 1-2 sentences (~15-30 words).
  
    Now, write one new detailed open-ended career-related question.
  `.trim();
  const requestBody = {
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: `You are a career expert that is helping a someone determine what might be the best path for them. 
        You are unbiased and consider a wide breadth of career options. ` },
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