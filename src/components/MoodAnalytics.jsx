import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"

import { motion } from "framer-motion"

function MoodAnalytics() {

  const moodHistory =
    JSON.parse(
      localStorage.getItem("mood-history")
    ) || []

  const moodValues = {
    Happy: 90,
    Calm: 75,
    Excited: 95,
    Sad: 40,
    Stressed: 25,
  }

  const chartData = moodHistory.map(
    (mood, index) => ({
      day: `#${index + 1}`,
      mood: mood.label,
      score:
        moodValues[mood.label] || 50,
    })
  )

  return (

    <motion.section

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

      className="px-6 md:px-10 py-20"
    >

      <div
        className="
          max-w-6xl
          mx-auto
          bg-white/5
          border
          border-cyan-400/20
          rounded-[40px]
          p-8
          backdrop-blur-xl
          relative
          overflow-hidden
        "
      >

        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10">

          <h2 className="text-4xl md:text-5xl font-extrabold text-center">

            Mood{" "}

            <span className="text-cyan-400">

              Analytics

            </span>

          </h2>

          <p className="text-center text-gray-400 mt-4">

            Real-time emotional wellness visualization.

          </p>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mt-14">

            {/* Line Chart */}
            <motion.div

              whileHover={{
                scale: 1.02,
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

              <h3 className="text-cyan-400 text-xl font-semibold mb-6">

                Emotional Trend

              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={chartData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#22d3ee"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </motion.div>

            {/* Area Chart */}
            <motion.div

              whileHover={{
                scale: 1.02,
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

              <h3 className="text-cyan-400 text-xl font-semibold mb-6">

                Wellness Stability

              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <AreaChart data={chartData}>

                  <defs>

                    <linearGradient
                      id="colorMood"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="5%"
                        stopColor="#22d3ee"
                        stopOpacity={0.8}
                      />

                      <stop
                        offset="95%"
                        stopColor="#22d3ee"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22d3ee"
                    fillOpacity={1}
                    fill="url(#colorMood)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </motion.div>

          </div>

        </div>

      </div>

    </motion.section>
  )
}

export default MoodAnalytics