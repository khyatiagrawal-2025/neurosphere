import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import { motion } from "framer-motion"

function MoodChart() {

  const moodHistory =
    JSON.parse(
      localStorage.getItem("mood-history")
    ) || []

  const moodValues = {
    Happy: 90,
    Calm: 75,
    Excited: 95,
    Sad: 40,
    Stressed: 30,
  }

  const chartData =
    moodHistory.map((mood, index) => ({
      day: index + 1,
      mood: moodValues[mood.label] || 50,
    }))

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
          max-w-6xl
          mx-auto
          bg-white/5
          border
          border-cyan-400/20
          rounded-[40px]
          backdrop-blur-xl
          p-8
        "
      >

        <h2 className="text-4xl md:text-5xl font-extrabold text-center">

          Emotional{" "}

          <span className="text-cyan-400">
            Trends
          </span>

        </h2>

        <p className="text-center text-gray-400 mt-4">

          Visualize your emotional wellness journey.

        </p>

        <div className="h-[400px] mt-14">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="mood"
                stroke="#22d3ee"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </motion.div>

    </section>
  )
}

export default MoodChart