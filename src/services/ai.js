export async function askNeuroSphere(message) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${
            import.meta.env.VITE_OPENROUTER_API_KEY
          }`,
        },

        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "system",
              content:
                "You are NeuroSphere, a futuristic AI assistant.",
            },

            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    )

    const data = await response.json()

    return data.choices[0].message.content

  } catch (error) {

    return "NeuroSphere failed to connect to AI systems."

  }
}