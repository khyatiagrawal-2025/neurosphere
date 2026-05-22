import Sphere from "./Sphere"
import { motion, useScroll } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Tilt from "react-parallax-tilt"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

function App() {

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const [loading, setLoading] = useState(true)

  const [menuOpen, setMenuOpen] = useState(false)

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

      <div className="h-screen bg-black flex items-center justify-center overflow-hidden">

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

    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden relative text-white"
    >

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mouse Glow */}
      <div
        className="absolute w-72 h-72 bg-cyan-400/10 blur-2xl rounded-full pointer-events-none transition-transform duration-75 z-0"
        style={{
          left: position.x - 150,
          top: position.y - 150,
        }}
      ></div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>

      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>

      {/* Aurora Effect */}
      <div className="absolute inset-0 overflow-hidden z-0">

        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-[pulse_10s_ease-in-out_infinite]"></div>

        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full animate-[pulse_12s_ease-in-out_infinite]"></div>

        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full animate-[pulse_8s_ease-in-out_infinite]"></div>

      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 border border-cyan-400/10 bg-white/5 backdrop-blur-md rounded-full mx-4 md:mx-6 mt-6 sticky top-4 z-50">

        <h1 className="text-2xl font-bold tracking-widest text-cyan-400">
          NeuroSphere
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300">

          <li className="hover:text-cyan-400 cursor-pointer transition">
            Home
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition">
            Features
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition">
            About
          </li>

        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-cyan-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <X size={30} /> : <Menu size={30} />}

        </button>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-4 bg-black/80 border border-cyan-400/20 rounded-3xl p-6 backdrop-blur-xl z-50 relative"
        >

          <ul className="flex flex-col gap-6 text-gray-300 text-lg">

            <li className="hover:text-cyan-400 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-cyan-400 cursor-pointer transition">
              Features
            </li>

            <li className="hover:text-cyan-400 cursor-pointer transition">
              About
            </li>

          </ul>

        </motion.div>

      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 relative z-10">

        {/* 3D Sphere */}
        <Sphere />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >

          Build The{" "}
          <span className="text-cyan-400">
            Future
          </span>

        </motion.h2>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-400 mt-6 max-w-2xl text-lg"
        >

          <TypeAnimation
            sequence={[
              "A futuristic AI powered ecosystem...",
              2000,
              "Immersive 3D experiences...",
              2000,
              "Intelligent interfaces for the future...",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />

        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 px-8 py-4 bg-cyan-400 text-black font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/40 transition duration-300"
        >

          Explore Now

        </motion.button>

      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20 relative z-10">

        {/* Card 1 */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable={true}
          glareMaxOpacity={0.3}
          scale={1.02}
        >

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-md shadow-lg shadow-cyan-500/10"
          >

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              AI Analytics
            </h3>

            <p className="text-gray-400">
              Real-time intelligent insights powered by futuristic neural systems.
            </p>

          </motion.div>

        </Tilt>

        {/* Card 2 */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable={true}
          glareMaxOpacity={0.3}
          scale={1.02}
        >

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-md shadow-lg shadow-cyan-500/10"
          >

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              3D Interface
            </h3>

            <p className="text-gray-400">
              Immersive interactions with modern animated experiences.
            </p>

          </motion.div>

        </Tilt>

        {/* Card 3 */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable={true}
          glareMaxOpacity={0.3}
          scale={1.02}
        >

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-md shadow-lg shadow-cyan-500/10"
          >

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Smart Security
            </h3>

            <p className="text-gray-400">
              Advanced encrypted architecture built for next-gen systems.
            </p>

          </motion.div>

        </Tilt>

      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-20 relative z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <h2 className="text-5xl font-bold text-cyan-400">
            10K+
          </h2>

          <p className="text-gray-400 mt-3">
            Active Users
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <h2 className="text-5xl font-bold text-cyan-400">
            99%
          </h2>

          <p className="text-gray-400 mt-3">
            AI Accuracy
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <h2 className="text-5xl font-bold text-cyan-400">
            24/7
          </h2>

          <p className="text-gray-400 mt-3">
            Smart Monitoring
          </p>

        </motion.div>

      </section>

      {/* AI Dashboard Section */}
      <section className="px-10 py-24 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-cyan-400/20 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
        >

          <div className="flex flex-col md:flex-row justify-between items-center gap-10">

            {/* Left Side */}
            <div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">

                AI Powered <span className="text-cyan-400">
                  Dashboard
                </span>

              </h2>

              <p className="text-gray-400 mt-6 max-w-xl text-lg">

                Monitor futuristic analytics, neural activity,
                security systems and real-time AI insights
                through immersive interfaces.

              </p>

              <button className="mt-8 px-8 py-4 bg-cyan-400 text-black rounded-full font-bold hover:scale-105 transition duration-300">

                Launch System

              </button>

            </div>

            {/* Right Side Dashboard */}
            <div className="grid grid-cols-2 gap-6 w-full md:w-[500px]">

              <div className="bg-black/40 border border-cyan-400/20 rounded-3xl p-6">

                <h3 className="text-cyan-400 text-lg">
                  Neural Activity
                </h3>

                <p className="text-4xl font-bold mt-4">
                  98%
                </p>

              </div>

              <div className="bg-black/40 border border-purple-400/20 rounded-3xl p-6">

                <h3 className="text-purple-400 text-lg">
                  AI Processing
                </h3>

                <p className="text-4xl font-bold mt-4">
                  12.4K
                </p>

              </div>

              <div className="bg-black/40 border border-cyan-400/20 rounded-3xl p-6">

                <h3 className="text-cyan-400 text-lg">
                  Security Level
                </h3>

                <p className="text-4xl font-bold mt-4">
                  MAX
                </p>

              </div>

              <div className="bg-black/40 border border-purple-400/20 rounded-3xl p-6">

                <h3 className="text-purple-400 text-lg">
                  System Health
                </h3>

                <p className="text-4xl font-bold mt-4">
                  99.9%
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/10 py-10 text-center text-gray-500 relative z-10">

        © 2026 NeuroSphere. All rights reserved.

      </footer>

    </div>
  )
}

export default App