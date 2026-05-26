import { motion } from "framer-motion"
import {
  Brain,
  Sparkles,
  HeartPulse,
} from "lucide-react"

function WellnessInsights() {

  const moodHistory =
    JSON.parse(
      localStorage.getItem("mood-history")
    ) || []

  const moodCounts = {}

  moodHistory.forEach((mood) => {

    moodCounts[mood.label] =
      (moodCounts[mood.label] || 0) + 1

  })

  const mostFrequentMood =
    Object.keys(moodCounts).reduce(
      (a, b) =>
        moodCounts[a] > moodCounts[b]
          ? a
          : b,
      "Happy"
    )

  const insights = []

  // AI Logic
  if (
    moodCounts["Stressed"] >= 3
  ) {

    insights.push(
      "Stress levels are elevated. Consider breathing exercises or meditation."
    )

  }

  if (
    moodCounts["Happy"] >= 3
  ) {

    insights.push(
      "Your positivity levels are improving consistently."
    )

  }

  if (
    moodCounts["Sad"] >= 2
  ) {

    insights.push(
      "Emotional wellness seems lower recently. Take breaks and prioritize self-care."
    )

  }

  if (
    moodCounts["Calm"] >= 3
  ) {

    insights.push(
      "Your emotional balance looks stable and peaceful."
    )

  }

  if (
    moodCounts["Excited"] >= 3
  ) {

    insights.push(
      "Motivation and energy levels are trending upward."
    )

  }

  if (insights.length === 0) {

    insights.push(
      "Track more moods to unlock advanced AI wellness insights."
    )

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

        className="
          max-w-6xl
          mx-auto
          bg-white/5
          border
          border-cyan-400/20
          rounded-[40px]
          backdrop-blur-xl
          p-8
          relative
          overflow-hidden
        "
      >

        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10">

          {/* Heading */}
          <div className="text-center">

            <motion.div

              animate={{
                rotate: [0, 8, -8, 0],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
              }}

              className="flex justify-center"
            >

              <Brain
                size={60}
                className="text-cyan-400 drop-shadow-[0_0_20px_#22d3ee]"
              />

            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-6">

              AI Wellness{" "}

              <span className="text-cyan-400">

                Insights

              </span>

            </h2>

            <p className="text-gray-400 mt-4 text-lg">

              NeuroSphere analyzes emotional patterns in real-time.

            </p>

          </div>

          {/* Main Insight Card */}
          <motion.div

            whileHover={{
              scale: 1.02,
              rotateX: 4,
              rotateY: -4,
            }}

            className="
              mt-14
              bg-black/40
              border
              border-cyan-400/10
              rounded-3xl
              p-8
              backdrop-blur-md
            "
          >

            <div className="flex items-center gap-4">

              <Sparkles
                className="text-cyan-400"
                size={30}
              />

              <div>

                <h3 className="text-2xl font-bold">

                  Dominant Mood

                </h3>

                <p className="text-cyan-400 text-lg mt-1">

                  {mostFrequentMood}

                </p>

              </div>

            </div>

          </motion.div>

          {/* AI Suggestions */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {insights.map(
              (insight, index) => (

                <motion.div

                  key={index}

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: index * 0.2,
                  }}

                  whileHover={{
                    scale: 1.03,
                    rotateX: 4,
                    rotateY: -4,
                  }}

                  className="
                    bg-black/40
                    border
                    border-cyan-400/10
                    rounded-3xl
                    p-6
                    backdrop-blur-md
                  "
                >

                  <div className="flex gap-4">

                    <HeartPulse
                      className="text-cyan-400 mt-1"
                    />

                    <p className="text-gray-300 leading-relaxed">

                      {insight}

                    </p>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </motion.div>

    </section>
  )
}

export default WellnessInsights