import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"

function WellnessInsights() {

  const moodHistory =
    JSON.parse(
      localStorage.getItem("mood-history")
    ) || []

  const latestMood =
    moodHistory[moodHistory.length - 1]

  const insights = [

    {
      title: "Emotional State",
      text:
        latestMood?.label === "Sad"
          ? "Your emotional energy seems low. Try relaxing activities."
          : latestMood?.label === "Stressed"
          ? "Stress levels detected. Consider taking mindful breaks."
          : latestMood?.label === "Happy"
          ? "Your emotional wellness looks positive today."
          : "Your emotional systems are stable.",
    },

    {
      title: "AI Recommendation",
      text:
        "Maintain consistency in tracking emotions for deeper AI wellness analysis.",
    },

    {
      title: "Neural Observation",
      text:
        "Emotional awareness increases mental clarity and productivity.",
    },
  ]

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
          max-w-7xl
          mx-auto
          relative
        "
      >

        <h2 className="text-4xl md:text-5xl font-extrabold text-center">

          AI Wellness{" "}

          <span className="text-cyan-400">
            Insights
          </span>

        </h2>

        <p className="text-center text-gray-400 mt-4">

          Futuristic emotional intelligence analysis.

        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {insights.map((item, index) => (

            <Tilt
              key={index}

              tiltMaxAngleX={15}
              tiltMaxAngleY={15}

              glareEnable={true}

              glareMaxOpacity={0.2}

              scale={1.03}

              transitionSpeed={2000}
            >

              <motion.div

                whileHover={{
                  y: -10,
                }}

                className="
                  relative
                  overflow-hidden
                  bg-white/5
                  border
                  border-cyan-400/20
                  backdrop-blur-xl
                  rounded-[35px]
                  p-8
                  min-h-[280px]
                  shadow-[0_0_40px_rgba(34,211,238,0.15)]
                "
              >

                {/* Glow */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>

                {/* Hologram Line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-purple-500"></div>

                <div className="relative z-10">

                  <h3 className="text-2xl font-bold text-cyan-400">

                    {item.title}

                  </h3>

                  <p className="text-gray-300 mt-6 leading-relaxed">

                    {item.text}

                  </p>

                </div>

              </motion.div>

            </Tilt>

          ))}

        </div>

      </motion.div>

    </section>
  )
}

export default WellnessInsights