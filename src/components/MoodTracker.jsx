import { motion } from "framer-motion"
import { useMood } from "../context/MoodContext"
import {
  Smile,
  CloudSun,
  Frown,
  Flame,
  Sparkles,
} from "lucide-react"

function MoodTracker() {

  const {
    selectedMood,
    setSelectedMood,
  } = useMood()

  const moods = [

    {
      emoji: "😊",
      label: "Happy",
      desc: "Feeling positive and energetic",
      icon: <Smile size={22} />,
      glow: "from-yellow-400/20 to-orange-500/20",
      border: "hover:border-yellow-400/40",
      shadow: "hover:shadow-yellow-400/20",
      analytics: {
        energy: 95,
        focus: 88,
        stress: 12,
      },
    },

    {
      emoji: "😌",
      label: "Calm",
      desc: "Relaxed and peaceful",
      icon: <CloudSun size={22} />,
      glow: "from-cyan-400/20 to-blue-500/20",
      border: "hover:border-cyan-400/40",
      shadow: "hover:shadow-cyan-400/20",
      analytics: {
        energy: 75,
        focus: 92,
        stress: 18,
      },
    },

    {
      emoji: "😔",
      label: "Sad",
      desc: "Low energy or emotional",
      icon: <Frown size={22} />,
      glow: "from-blue-400/20 to-indigo-500/20",
      border: "hover:border-blue-400/40",
      shadow: "hover:shadow-blue-400/20",
      analytics: {
        energy: 45,
        focus: 52,
        stress: 70,
      },
    },

    {
      emoji: "😤",
      label: "Stressed",
      desc: "Overwhelmed or frustrated",
      icon: <Flame size={22} />,
      glow: "from-red-400/20 to-pink-500/20",
      border: "hover:border-red-400/40",
      shadow: "hover:shadow-red-400/20",
      analytics: {
        energy: 68,
        focus: 40,
        stress: 96,
      },
    },

    {
      emoji: "🤩",
      label: "Excited",
      desc: "Motivated and inspired",
      icon: <Sparkles size={22} />,
      glow: "from-pink-400/20 to-purple-500/20",
      border: "hover:border-pink-400/40",
      shadow: "hover:shadow-pink-400/20",
      analytics: {
        energy: 99,
        focus: 90,
        stress: 25,
      },
    },

  ]

  const handleMoodSelect = (mood) => {

    setSelectedMood(mood)

    localStorage.setItem(
      "selected-mood",
      JSON.stringify(mood)
    )

    window.dispatchEvent(
      new Event("moodUpdated")
    )

    const oldMoods =
      JSON.parse(
        localStorage.getItem("mood-history")
      ) || []

    const updatedMoods = [
      ...oldMoods,
      {
        ...mood,
        time: new Date().toLocaleString(),
      },
    ]

    localStorage.setItem(
      "mood-history",
      JSON.stringify(updatedMoods)
    )
  }

  return (

    <section className="px-6 md:px-10 py-24 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>

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
          max-w-6xl
          mx-auto
          bg-white/5
          border
          border-cyan-400/20
          rounded-[40px]
          backdrop-blur-2xl
          p-8
          md:p-12
          relative
          overflow-hidden
        "
      >

        {/* Floating Glow */}
        <motion.div

          animate={{
            y: [0, -20, 0],
          }}

          transition={{
            duration: 6,
            repeat: Infinity,
          }}

          className="
            absolute
            top-10
            right-10
            w-40
            h-40
            bg-cyan-400/10
            blur-3xl
            rounded-full
          "
        />

        {/* Heading */}
        <div className="relative z-10">

          <h2
            className="
              text-4xl
              md:text-5xl
              font-extrabold
              text-center
            "
          >

            Mood{" "}

            <span className="text-cyan-400">

              Tracker

            </span>

          </h2>

          <p className="text-center text-gray-400 mt-4 text-lg">

            Track your emotional wellness in real-time.

          </p>

        </div>

        {/* Current Mood Display */}
        <motion.div

          key={selectedMood.label}

          initial={{
            scale: 0.8,
            opacity: 0,
          }}

          animate={{
            scale: 1,
            opacity: 1,
          }}

          transition={{
            duration: 0.5,
          }}

          className="
            mt-14
            text-center
            relative
            z-10
          "
        >

          {/* 3D Floating Emoji */}
          <motion.div

            animate={{
              y: [0, -12, 0],
              rotate: [0, 6, -6, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
            }}

            className="
              relative
              inline-block
            "
          >

            <div className="
              absolute
              inset-0
              bg-cyan-400/20
              blur-3xl
              rounded-full
            "></div>

            <div
              className="
                relative
                text-8xl
                md:text-9xl
                drop-shadow-[0_0_35px_rgba(34,211,238,0.7)]
              "
            >
              {selectedMood.emoji}
            </div>

          </motion.div>

          <h3 className="text-4xl font-bold mt-6">

            {selectedMood.label}

          </h3>

          <p className="text-gray-400 mt-3 text-lg max-w-xl mx-auto">

            {
              moods.find(
                (m) =>
                  m.label === selectedMood.label
              )?.desc
            }

          </p>

        </motion.div>

        {/* Analytics Mini Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-14 relative z-10">

          {[
            {
              title: "Energy",
              value:
                moods.find(
                  (m) =>
                    m.label === selectedMood.label
                )?.analytics.energy,
            },

            {
              title: "Focus",
              value:
                moods.find(
                  (m) =>
                    m.label === selectedMood.label
                )?.analytics.focus,
            },

            {
              title: "Stress",
              value:
                moods.find(
                  (m) =>
                    m.label === selectedMood.label
                )?.analytics.stress,
            },

          ].map((item, index) => (

            <motion.div

              key={index}

              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: -5,
              }}

              className="
                bg-black/40
                border
                border-cyan-400/10
                rounded-3xl
                p-6
                backdrop-blur-xl
                relative
                overflow-hidden
              "
            >

              <div className="absolute inset-0 bg-cyan-400/5"></div>

              <div className="relative z-10">

                <p className="text-gray-400">
                  {item.title}
                </p>

                <motion.h4

                  key={item.value}

                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}

                  className="
                    text-5xl
                    font-extrabold
                    mt-3
                    text-cyan-400
                  "
                >

                  {item.value}%

                </motion.h4>

                <div className="w-full h-2 bg-white/10 rounded-full mt-6 overflow-hidden">

                  <motion.div

                    initial={{
                      width: 0,
                    }}

                    animate={{
                      width: `${item.value}%`,
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

              </div>

            </motion.div>

          ))}

        </div>

        {/* Mood Cards */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-5
            gap-6
            mt-16
            relative
            z-10
          "
        >

          {moods.map((mood, index) => (

            <motion.button

              key={index}

              whileHover={{
                scale: 1.08,
                rotateX: 10,
                rotateY: -10,
                y: -8,
              }}

              whileTap={{
                scale: 0.95,
              }}

              transition={{
                type: "spring",
                stiffness: 200,
              }}

              onClick={() =>
                handleMoodSelect(mood)
              }

              className={`
                relative
                overflow-hidden
                p-6
                rounded-3xl
                bg-gradient-to-b
                ${mood.glow}
                border
                border-cyan-400/10
                backdrop-blur-xl
                transition-all
                duration-300
                ${mood.border}
                ${mood.shadow}
                hover:shadow-2xl
              `}
            >

              {/* Card Glow */}
              <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">

                <div className="flex justify-center mb-4 text-cyan-300">

                  {mood.icon}

                </div>

                <div className="text-5xl">

                  {mood.emoji}

                </div>

                <h4 className="mt-4 text-lg font-bold">

                  {mood.label}

                </h4>

                <p className="text-sm text-gray-400 mt-2">

                  {mood.desc}

                </p>

              </div>

            </motion.button>

          ))}

        </div>

      </motion.div>

    </section>
  )
}

export default MoodTracker