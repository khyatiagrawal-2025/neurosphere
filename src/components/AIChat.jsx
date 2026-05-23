import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { askNeuroSphere } from "../services/ai"

function AIChat() {

  const [input, setInput] = useState("")

  const [messages, setMessages] = useState(() => {

  const savedMessages = localStorage.getItem("neuro-chat")

  return savedMessages
    ? JSON.parse(savedMessages)
    : [
        {
          sender: "ai",
          text: "Welcome to NeuroSphere AI Assistant.",
        },
      ]
})

  const [loading, setLoading] = useState(false)

  useEffect(() => {

  localStorage.setItem(
    "neuro-chat",
    JSON.stringify(messages)
  )

}, [messages])

  const handleSend = async () => {

    if (!input.trim()) return

    const currentInput = input

    const userMessage = {
      sender: "user",
      text: currentInput,
    }

    // Show user message
    setMessages((prev) => [...prev, userMessage])

    // Clear input
    setInput("")

    // Start loading
    setLoading(true)

    // Get AI response
    const response = await askNeuroSphere(currentInput)

    const aiMessage = {
      sender: "ai",
      text: response,
    }

    // Add AI message
    setMessages((prev) => [...prev, aiMessage])

    // Stop loading
    setLoading(false)
  }

  return (

    <section className="px-6 md:px-10 py-20">

      <div className="max-w-4xl mx-auto bg-white/5 border border-cyan-400/20 rounded-[40px] backdrop-blur-xl p-8">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
          NeuroSphere <span className="text-cyan-400">AI Assistant</span>
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Interact with the futuristic neural intelligence system.
        </p>

        <div className="flex justify-center mt-6">

  <button
    onClick={() => {

      const defaultMessage = [
        {
          sender: "ai",
          text: "Welcome to NeuroSphere AI Assistant.",
        },
      ]

      setMessages(defaultMessage)

      localStorage.removeItem("neuro-chat")

    }}
    className="px-6 py-3 rounded-full bg-red-500/20 border border-red-500/20 text-red-300 hover:bg-red-500/30 transition"
  >
    Clear Chat
  </button>

</div>

        {/* Chat Box */}
        <div className="mt-10 h-[400px] overflow-y-auto space-y-4 pr-2">

          {messages.map((msg, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] px-5 py-4 rounded-3xl ${
                msg.sender === "user"
                  ? "ml-auto bg-cyan-400 text-black"
                  : "bg-black/40 border border-cyan-400/10 text-white"
              }`}
            >
              {msg.text}
            </motion.div>

          ))}

          {/* Loading Animation */}
          {loading && (

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-black/40 border border-cyan-400/10 text-white px-5 py-4 rounded-3xl w-fit flex gap-2 items-center"
  >

    <span>NeuroSphere is thinking</span>

    <div className="flex gap-1">

      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        .
      </motion.span>

      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2,
        }}
      >
        .
      </motion.span>

      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4,
        }}
      >
        .
      </motion.span>

    </div>

  </motion.div>

)}

        </div>

        {/* Input */}
        <div className="flex gap-4 mt-8">

          <input
  type="text"
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }}
            placeholder="Ask NeuroSphere..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-black/40 border border-cyan-400/20 rounded-full px-6 py-4 outline-none text-white"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="bg-cyan-400 text-black px-8 rounded-full font-bold"
          >
            Send
          </motion.button>

        </div>

      </div>

    </section>
  )
}

export default AIChat