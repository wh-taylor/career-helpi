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

  const prompt = `
    You are a creative and intelligent assistant. Based on the following previous questions, generate a NEW detailed and engaging follow-up question.

    Previous Questions:
    ${prevQA.map((q, idx) => `${idx + 1}. ${q.question}`).join("\n")}

    Guidelines:
    - The new question should build logically from what was asked before.
    - It should be more detailed, specific, or advanced.
    - Do NOT repeat previous questions.
    - The question should invite a deeper or more thoughtful response.

    Now, generate one new detailed follow-up question:
    `;
  const requestBody = {
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: "You are an expert at crafting engaging and detailed questions." },
      { role: "user", content: prompt.trim() }
    ],
    max_tokens: 150 
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + {keyData}
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