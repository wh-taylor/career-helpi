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