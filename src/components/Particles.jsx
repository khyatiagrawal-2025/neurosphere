import { motion } from "framer-motion"

function Particles() {

  const particles = Array.from({ length: 25 })

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {particles.map((_, index) => (

        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"

          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}

          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}

          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />

      ))}

    </div>
  )
}

export default Particles