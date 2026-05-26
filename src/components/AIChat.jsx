import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import { askNeuroSphere } from "../services/ai"
import { useMood } from "../context/MoodContext"
import TypeWriter from "./TypeWriter"

import {
  Mic,
  MicOff,
  SendHorizontal,
  Volume2,
} from "lucide-react"

function AIChat() {

  const { selectedMood } = useMood()

  const [input, setInput] = useState("")

  const [messages, setMessages] = useState(() => {

    const savedMessages =
      localStorage.getItem("neuro-chat")

    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            sender: "ai",
            text:
              "Welcome to NeuroSphere AI Assistant.",
            time: new Date().toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
          },
        ]
  })

  const [loading, setLoading] =
    useState(false)

  const [listening, setListening] =
    useState(false)

  const [speaking, setSpeaking] =
    useState(false)

  const chatEndRef = useRef(null)

  // Speech Recognition
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  const recognition =
    SpeechRecognition
      ? new SpeechRecognition()
      : null

  // Save chats
  useEffect(() => {

    localStorage.setItem(
      "neuro-chat",
      JSON.stringify(messages)
    )

  }, [messages])

  // Auto Scroll
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })

  }, [messages, loading])

  // AI Voice Reply
  const speakText = (text) => {

    if (!window.speechSynthesis)
      return

    window.speechSynthesis.cancel()

    const utterance =
      new SpeechSynthesisUtterance(text)

    utterance.rate = 1
    utterance.pitch = 1

    setSpeaking(true)

    utterance.onend = () => {

      setSpeaking(false)

    }

    window.speechSynthesis.speak(
      utterance
    )
  }

  // Send Message
  const handleSend = async () => {

    if (!input.trim()) return

    const currentInput = input

    const userMessage = {
      sender: "user",
      text: currentInput,
      time: new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      userMessage,
    ])

    // Clear input
    setInput("")

    // Loading start
    setLoading(true)

    // AI response
    const response =
      await askNeuroSphere(
        currentInput,
        messages,
        selectedMood
      )

    const aiMessage = {
      sender: "ai",
      text: response,
      time: new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    }

    // Add AI response
    setMessages((prev) => [
      ...prev,
      aiMessage,
    ])

    // Speak AI response
    speakText(response)

    // Loading stop
    setLoading(false)
  }

  // Voice Input
  const handleVoice = () => {

    if (!recognition) {

      alert(
        "Speech Recognition is not supported in this browser."
      )

      return
    }

    recognition.lang = "en-US"

    setListening(true)

    recognition.start()

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript

      setInput(transcript)

      setListening(false)
    }

    recognition.onerror = () => {

      setListening(false)

    }

    recognition.onend = () => {

      setListening(false)

    }
  }

  // Clear Chat
  const clearChat = () => {

    const defaultMessage = [
      {
        sender: "ai",
        text:
          "Welcome to NeuroSphere AI Assistant.",
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },
    ]

    setMessages(defaultMessage)

    localStorage.removeItem("neuro-chat")
  }

  return (

    <section className="px-6 md:px-10 py-20">

      <motion.div

        initial={{
          opacity: 0,
          y: 80,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        viewport={{ once: true }}

        className="
          max-w-5xl
          mx-auto
          bg-white/5
          border
          border-cyan-400/20
          rounded-[40px]
          backdrop-blur-xl
          p-6
          md:p-8
          relative
          overflow-hidden
          shadow-[0_0_50px_rgba(34,211,238,0.08)]
        "
      >

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        {/* Header */}
        <div className="relative z-10">

          <motion.h2

            initial={{
              opacity: 0,
              y: -30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            className="
              text-4xl
              md:text-5xl
              font-extrabold
              text-center
            "
          >

            NeuroSphere{" "}

            <span className="text-cyan-400 drop-shadow-[0_0_25px_#22d3ee]">
              AI Assistant
            </span>

          </motion.h2>

          <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">

            Mood detected:

            <span className="text-cyan-400 font-semibold ml-2">

              {selectedMood.emoji}
              {" "}
              {selectedMood.label}

            </span>

          </p>

          {/* AI Speaking Indicator */}
          {speaking && (

            <motion.div

              animate={{
                opacity: [0.5, 1, 0.5],
              }}

              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}

              className="
                flex
                justify-center
                items-center
                gap-2
                mt-5
                text-cyan-400
              "
            >

              <Volume2 size={20} />

              <span>
                NeuroSphere is speaking...
              </span>

            </motion.div>

          )}

          {/* Clear Chat */}
          <div className="flex justify-center mt-6">

            <motion.button

              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0px 0px 20px rgba(239,68,68,0.4)",
              }}

              whileTap={{
                scale: 0.95,
              }}

              onClick={clearChat}

              className="
                px-6
                py-3
                rounded-full
                bg-red-500/20
                border
                border-red-500/20
                text-red-300
                hover:bg-red-500/30
                transition-all
              "
            >

              Clear Chat

            </motion.button>

          </div>

        </div>

        {/* Chat Area */}
        <div
          className="
            mt-10
            h-[500px]
            overflow-y-auto
            space-y-4
            pr-2
            relative
            z-10
            custom-scroll
          "
        >

          {messages.map((msg, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              transition={{
                duration: 0.3,
              }}

              className={`max-w-[85%] px-5 py-4 rounded-3xl ${
                msg.sender === "user"

                  ? `
                    ml-auto
                    bg-cyan-400
                    text-black
                    shadow-[0_0_25px_rgba(34,211,238,0.5)]
                  `

                  : `
                    bg-black/40
                    border
                    border-cyan-400/10
                    text-white
                    backdrop-blur-md
                  `
              }`}
            >

              <TypeWriter text={msg.text} />

              <p className="text-xs text-gray-400 mt-3 opacity-70">

                {msg.time}

              </p>

            </motion.div>

          ))}

          {/* Loading */}
          {loading && (

            <motion.div

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              className="
                bg-black/40
                border
                border-cyan-400/10
                text-white
                px-5
                py-4
                rounded-3xl
                w-fit
                flex
                gap-3
                items-center
              "
            >

              <motion.div

                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}

                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}

                className="
                  w-3
                  h-3
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_20px_#22d3ee]
                "
              />

              <span>
                Neural engine processing...
              </span>

            </motion.div>

          )}

          {/* Scroll Ref */}
          <div ref={chatEndRef}></div>

        </div>

        {/* Input Area */}
        <div className="flex gap-4 mt-8 relative z-10">

          {/* Input */}
          <input

            type="text"

            value={input}

            placeholder="Ask NeuroSphere..."

            onChange={(e) =>
              setInput(e.target.value)
            }

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleSend()

              }

            }}

            className="
              flex-1
              bg-black/40
              border
              border-cyan-400/20
              rounded-full
              px-6
              py-4
              outline-none
              text-white
              backdrop-blur-md
              focus:border-cyan-400
              focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]
              transition-all
            "
          />

          {/* Voice Button */}
          <motion.button

            whileHover={{
              scale: 1.08,
              boxShadow:
                "0px 0px 25px rgba(168,85,247,0.7)",
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={handleVoice}

            className={`
              px-5
              rounded-full
              flex
              items-center
              justify-center
              transition-all
              ${
                listening
                  ? "bg-red-500 text-white"
                  : "bg-purple-500 text-white"
              }
            `}
          >

            {listening
              ? <MicOff size={22} />
              : <Mic size={22} />
            }

          </motion.button>

          {/* Send Button */}
          <motion.button

            whileHover={{
              scale: 1.05,
              boxShadow:
                "0px 0px 30px rgba(34,211,238,0.7)",
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={handleSend}

            className="
              bg-cyan-400
              text-black
              px-8
              rounded-full
              font-bold
              flex
              items-center
              gap-2
            "
          >

            Send

            <SendHorizontal size={18} />

          </motion.button>

        </div>

      </motion.div>

    </section>
  )
}

export default AIChat