import AIChat from "../components/AIChat"
import { motion } from "framer-motion"

function ChatPage() {

  return (

    <div className="px-6 md:px-10 py-20">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold text-center"
      >
        NeuroSphere <span className="text-cyan-400">AI</span>
      </motion.h1>

      <p className="text-center text-gray-400 mt-6 max-w-2xl mx-auto">
        Communicate with the futuristic AI assistant powered by intelligent neural systems.
      </p>

      <AIChat />

    </div>
  )
}

export default ChatPage