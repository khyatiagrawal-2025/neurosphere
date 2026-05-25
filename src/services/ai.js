const API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY

export async function askNeuroSphere(
  userMessage,
  previousMessages = []
) {

  try {

    const formattedMessages =
      previousMessages.map((msg) => ({
        role:
          msg.sender === "user"
            ? "user"
            : "assistant",

        content: msg.text,
      }))

    formattedMessages.push({
      role: "user",
      content: userMessage,
    })

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {

        method: "POST",

        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          model:
            "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "system",

              content: `
You are NeuroSphere AI,
a calm futuristic wellness assistant.
              `,
            },

            ...formattedMessages,
          ],
        }),
      }
    )

    // DEBUG
    console.log("Response status:", response.status)

    const data = await response.json()

    console.log("AI DATA:", data)

    return (
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "NeuroSphere could not process that."
    )

  } catch (error) {

    console.error("AI ERROR:", error)

    return "NeuroSphere connection failed."
  }
}