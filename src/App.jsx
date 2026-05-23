import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import DashboardPage from "./pages/DashboardPage"
import ChatPage from "./pages/ChatPage"

function App() {

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)

  }, [])

  const handleMouseMove = (e) => {

    setPosition({
      x: e.clientX,
      y: e.clientY,
    })

  }

  // Loading Screen
  if (loading) {

    return (
      <div className="h-screen bg-black flex items-center justify-center">

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-6xl md:text-8xl font-extrabold text-cyan-400 tracking-widest"
        >
          NeuroSphere
        </motion.h1>

      </div>
    )
  }

  return (

    <BrowserRouter>

      <div
        onMouseMove={handleMouseMove}
        className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden relative text-white"
      >

        {/* Scroll Progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[9999]"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Mouse Glow */}
        <div
          className="absolute w-72 h-72 bg-cyan-400/10 blur-2xl rounded-full pointer-events-none"
          style={{
            left: position.x - 150,
            top: position.y - 150,
          }}
        />

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/chat"
            element={<ChatPage />}
          />

        </Routes>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-10 border-t border-cyan-400/10">
          © 2026 NeuroSphere. Built for futuristic experiences.
        </footer>

      </div>

    </BrowserRouter>
  )
}

export default App