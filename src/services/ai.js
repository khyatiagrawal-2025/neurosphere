const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

export const askNeuroSphere = async (input, chatHistory = [], mood) => {
  try {
    const messages = [
      {
        role: "system",
        content: `
You are NeuroSphere AI, a friendly mental wellness assistant.

User mood: ${mood?.label || "Neutral"} ${mood?.emoji || ""}

Rules:
- Be natural like a friend
- Short, emotional, human-like replies
- Remember conversation context
        `,
      },

      // 🔥 conversation memory
      ...chatHistory.slice(-10).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),

      {
        role: "user",
        content: input,
      },
    ]

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
        "X-Title": "NeuroSphere",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
      }),
    })

    const data = await response.json()

    return data?.choices?.[0]?.message?.content || "No response"
  } catch (err) {
    console.error(err)
    return "AI failed"
  }
}