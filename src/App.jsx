import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import DashboardPage from "./pages/DashboardPage"
import ChatPage from "./pages/ChatPage"

import Particles from "./components/Particles"
import InteractiveParticles from "./components/InteractiveParticles"
import ScrollToTop from "./components/ScrollToTop"

import { useMood } from "./context/MoodContext"

function App() {

  const { selectedMood } = useMood()

  const [position, setPosition] =
    useState({ x: 0, y: 0 })

  const [loading, setLoading] =
    useState(true)

  const { scrollYProgress } =
    useScroll()

  // Dynamic mood glow colors
  const moodGlow = {
    Happy: "bg-yellow-400/10",
    Calm: "bg-cyan-400/10",
    Sad: "bg-blue-400/10",
    Stressed: "bg-red-400/10",
    Excited: "bg-pink-400/10",
  }

  // Loading screen
  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false)

      window.scrollTo({
        top: 0,
        behavior: "instant",
      })

    }, 2500)

    return () => clearTimeout(timer)

  }, [])

  // Prevent browser restoring old scroll
  useEffect(() => {

    if ("scrollRestoration" in history) {

      history.scrollRestoration = "manual"

    }

  }, [])

  // Mouse movement
  const handleMouseMove = (e) => {

    setPosition({
      x: e.clientX,
      y: e.clientY,
    })

  }

  // LOADING SCREEN
  if (loading) {

    return (

      <div className="h-screen bg-black flex items-center justify-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-3xl rounded-full"></div>

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.7,
            rotateX: -30,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
          }}

          transition={{
            duration: 1.5,
          }}

          className="relative perspective-[1000px]"
        >

          <motion.h1

            animate={{
              y: [0, -10, 0],
            }}

            transition={{
              duration: 3,
              repeat: Infinity,
            }}

            className="
              text-6xl
              md:text-8xl
              font-extrabold
              tracking-widest
              text-cyan-400
              drop-shadow-[0_0_40px_#22d3ee]
            "
          >

            NeuroSphere

          </motion.h1>

          <p className="text-center text-gray-400 mt-6 tracking-[4px]">

            FUTURISTIC WELLNESS SYSTEM

          </p>

        </motion.div>

      </div>
    )
  }

  return (

    <BrowserRouter>

      {/* Scroll To Top */}
      <ScrollToTop />

      <div

        onMouseMove={handleMouseMove}

        className="
          min-h-screen
          bg-gradient-to-b
          from-black
          via-slate-950
          to-black
          overflow-hidden
          relative
          text-white
        "
      >

        {/* Scroll Progress Bar */}
        <motion.div

          className="
            fixed
            top-0
            left-0
            right-0
            h-1
            bg-cyan-400
            origin-left
            z-[9999]
            shadow-[0_0_20px_#22d3ee]
          "

          style={{
            scaleX: scrollYProgress,
          }}
        />

        {/* Mouse Glow */}
        <motion.div

          animate={{
            left: position.x - 150,
            top: position.y - 150,
          }}

          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}

          className={`
            fixed
            w-72
            h-72
            rounded-full
            blur-3xl
            pointer-events-none
            z-0
            ${moodGlow[selectedMood.label]}
          `}
        />

        {/* Interactive Particles */}
        <InteractiveParticles />

        {/* Background Particles */}
        <Particles />

        {/* Top Glow */}
        <motion.div

          animate={{
            scale: [1, 1.1, 1],
          }}

          transition={{
            duration: 6,
            repeat: Infinity,
          }}

          className="
            absolute
            top-10
            left-10
            w-[400px]
            h-[400px]
            bg-purple-500/20
            blur-3xl
            rounded-full
          "
        />

        {/* Bottom Glow */}
        <motion.div

          animate={{
            scale: [1, 1.15, 1],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
          }}

          className="
            absolute
            bottom-10
            right-10
            w-[400px]
            h-[400px]
            bg-cyan-500/20
            blur-3xl
            rounded-full
          "
        />

        {/* Grid Overlay */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:60px_60px]
            z-0
          "
        />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10">

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

        </div>

        {/* Footer */}
        <footer
          className="
            relative
            z-10
            text-center
            text-gray-500
            py-10
            border-t
            border-cyan-400/10
            backdrop-blur-md
          "
        >

          <motion.p

            animate={{
              opacity: [0.5, 1, 0.5],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >

            © 2026 NeuroSphere — AI Powered Mental Wellness Platform

          </motion.p>

        </footer>

      </div>

    </BrowserRouter>
  )
}

export default App