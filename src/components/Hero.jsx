import Sphere from "../Sphere"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen px-6">

      <Sphere />

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold leading-tight"
      >
        Explore The <span className="text-cyan-400 drop-shadow-[0_0_25px_#22d3ee]">NeuroSphere</span>
      </motion.h2>

      <div className="text-gray-400 mt-6 max-w-2xl text-lg">

        <TypeAnimation
          sequence={[
            "A futuristic AI powered ecosystem...",
            2000,
            "Immersive 3D digital experiences...",
            2000,
            "Where intelligence meets visualization...",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />

      </div>

      <p className="text-gray-500 mt-4 text-sm max-w-xl">
        A next-gen experimental AI interface built for immersive interaction and intelligent systems.
      </p>

      <motion.button
        whileHover={{
  scale: 1.1,
  boxShadow: "0px 0px 30px rgba(34,211,238,0.8)",
}}
        className="mt-8 px-8 py-4 bg-cyan-400 text-black font-bold rounded-full"
      >
        Explore Now
      </motion.button>

    </section>
  )
}

export default Hero