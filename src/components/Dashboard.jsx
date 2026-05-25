import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function Dashboard() {

  const [stats, setStats] = useState({
    neural: 95,
    processing: 12000,
    security: 99,
    health: 98,
  })

  const [moodHistory, setMoodHistory] =
    useState([])

  const [topMood, setTopMood] =
    useState("Happy")

  const [latestMood, setLatestMood] =
    useState({
      emoji: "😊",
      label: "Happy",
    })

  const moodMap = {

    Happy: {
      emoji: "😊",
      color: "from-yellow-400/20 to-orange-500/20",
      energy: 95,
    },

    Calm: {
      emoji: "😌",
      color: "from-cyan-400/20 to-blue-500/20",
      energy: 78,
    },

    Sad: {
      emoji: "😔",
      color: "from-blue-400/20 to-indigo-500/20",
      energy: 45,
    },

    Stressed: {
      emoji: "😤",
      color: "from-red-400/20 to-pink-500/20",
      energy: 60,
    },

    Excited: {
      emoji: "🤩",
      color: "from-pink-400/20 to-purple-500/20",
      energy: 99,
    },

  }

  // Dynamic AI stats
  useEffect(() => {

    const interval = setInterval(() => {

      setStats({
        neural:
          Math.floor(Math.random() * 10) + 90,

        processing:
          Math.floor(Math.random() * 5000) + 10000,

        security:
          Math.floor(Math.random() * 5) + 95,

        health:
          Math.floor(Math.random() * 3) + 97,
      })

    }, 2000)

    return () => clearInterval(interval)

  }, [])

  // Mood Analytics
  useEffect(() => {

    const loadMoodData = () => {

      const history =
        JSON.parse(
          localStorage.getItem(
            "mood-history"
          )
        ) || []

      setMoodHistory(history)

      // Latest mood
      const latest =
        JSON.parse(
          localStorage.getItem(
            "selected-mood"
          )
        )

      if (latest) {

        setLatestMood(latest)

      }

      // Count moods
      const counts = {}

      history.forEach((mood) => {

        counts[mood.label] =
          (counts[mood.label] || 0) + 1

      })

      let highest = 0
      let moodName = "Happy"

      for (const mood in counts) {

        if (counts[mood] > highest) {

          highest = counts[mood]
          moodName = mood

        }

      }

      setTopMood(moodName)
    }

    // Initial load
    loadMoodData()

    // Real-time update listener
    window.addEventListener(
      "moodUpdated",
      loadMoodData
    )

    return () => {

      window.removeEventListener(
        "moodUpdated",
        loadMoodData
      )

    }

  }, [])

  const cards = [

    {
      title: "Neural Activity",
      value: `${stats.neural}%`,
    },

    {
      title: "AI Processing",
      value: `${stats.processing}+`,
    },

    {
      title: "Security",
      value: `${stats.security}%`,
    },

    {
      title: "System Health",
      value: `${stats.health}%`,
    },

  ]

  return (

    <motion.section

      initial={{
        opacity: 0,
        y: 100,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 1,
      }}

      viewport={{ once: true }}

      className="px-6 md:px-10 py-20"
    >

      <div
        className="
          bg-white/5
          border
          border-cyan-400/20
          rounded-[40px]
          p-8
          md:p-10
          backdrop-blur-xl
          relative
          overflow-hidden
        "
      >

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        {/* Heading */}
        <motion.h2

          initial={{
            opacity: 0,
            y: -40,
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
            relative
            z-10
          "
        >

          AI Powered{" "}

          <span className="text-cyan-400 drop-shadow-[0_0_25px_#22d3ee]">

            Dashboard

          </span>

        </motion.h2>

        <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto relative z-10">

          Real-time neural system monitoring and futuristic AI wellness analytics.

        </p>

        {/* Top Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-12 relative z-10">

          {cards.map((card, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 50,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}

              whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: -10,
                boxShadow:
                  "0px 0px 30px rgba(34,211,238,0.3)",
              }}

              className="
                bg-black/40
                p-6
                rounded-3xl
                text-center
                border
                border-cyan-400/10
                backdrop-blur-md
                hover:border-cyan-400/40
                transition-all
                duration-500
              "
            >

              <h3 className="text-cyan-400 text-lg font-semibold">

                {card.title}

              </h3>

              <motion.p

                key={card.value}

                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}

                animate={{
                  scale: 1,
                  opacity: 1,
                }}

                transition={{
                  duration: 0.4,
                }}

                className="
                  text-4xl
                  font-extrabold
                  mt-4
                "
              >

                {card.value}

              </motion.p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full mt-6 overflow-hidden">

                <motion.div

                  initial={{
                    width: 0,
                  }}

                  animate={{
                    width: `${Math.min(
                      parseInt(card.value),
                      100
                    )}%`,
                  }}

                  transition={{
                    duration: 1,
                  }}

                  className="
                    h-full
                    bg-cyan-400
                    rounded-full
                  "
                />

              </div>

            </motion.div>

          ))}

        </div>

        {/* Current Mood Section */}
        <motion.div

          initial={{
            opacity: 0,
            scale: 0.8,
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.8,
          }}

          className={`
            mt-14
            rounded-[35px]
            p-10
            bg-gradient-to-r
            ${moodMap[latestMood.label]?.color}
            border
            border-cyan-400/10
            backdrop-blur-xl
            relative
            overflow-hidden
            text-center
          `}
        >

          {/* Floating Glow */}
          <div className="absolute inset-0 bg-white/5"></div>

          <motion.div

            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
            }}

            className="relative z-10"
          >

            <div className="text-8xl drop-shadow-[0_0_35px_rgba(34,211,238,0.6)]">

              {latestMood.emoji}

            </div>

            <h3 className="text-4xl font-extrabold mt-6">

              {latestMood.label} Mood Detected

            </h3>

            <p className="text-gray-300 mt-4 max-w-xl mx-auto">

              NeuroSphere AI analyzed your emotional wellness
              and updated your live dashboard insights.

            </p>

          </motion.div>

        </motion.div>

        {/* Mood Analytics */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 relative z-10">

          {/* Total Logs */}
          <motion.div

            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: -8,
            }}

            className="
              bg-black/40
              border
              border-cyan-400/10
              rounded-3xl
              p-8
              text-center
              backdrop-blur-md
            "
          >

            <h3 className="text-cyan-400 text-lg">

              Total Mood Logs

            </h3>

            <p className="text-5xl font-bold mt-4">

              {moodHistory.length}

            </p>

          </motion.div>

          {/* Frequent Mood */}
          <motion.div

            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: -8,
            }}

            className="
              bg-black/40
              border
              border-cyan-400/10
              rounded-3xl
              p-8
              text-center
              backdrop-blur-md
            "
          >

            <h3 className="text-cyan-400 text-lg">

              Most Frequent Mood

            </h3>

            <p className="text-4xl font-bold mt-4">

              {topMood}

            </p>

          </motion.div>

          {/* Energy */}
          <motion.div

            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: -8,
            }}

            className="
              bg-black/40
              border
              border-cyan-400/10
              rounded-3xl
              p-8
              text-center
              backdrop-blur-md
            "
          >

            <h3 className="text-cyan-400 text-lg">

              Emotional Energy

            </h3>

            <p className="text-5xl font-bold mt-4">

              {
                moodMap[
                  latestMood.label
                ]?.energy
              }%

            </p>

          </motion.div>

        </div>

      </div>

    </motion.section>
  )
}

export default Dashboard