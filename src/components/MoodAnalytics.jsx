import { motion } from "framer-motion"

function MoodAnalytics() {

  const moodHistory =
    JSON.parse(
      localStorage.getItem("mood-history")
    ) || []

  const totalEntries =
    moodHistory.length

  const moodCounts = {}

  moodHistory.forEach((mood) => {

    moodCounts[mood.label] =
      (moodCounts[mood.label] || 0) + 1

  })

  const dominantMood =
    Object.keys(moodCounts).reduce(
      (a, b) =>
        moodCounts[a] > moodCounts[b]
          ? a
          : b,
      "Happy"
    )

  const latestMoods =
    moodHistory.slice(-5).reverse()

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

            Real-time emotional insights.

          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="bg-black/40 border border-cyan-400/10 rounded-3xl p-8 text-center">

              <h3 className="text-cyan-400 text-lg">
                Total Entries
              </h3>

              <p className="text-5xl font-bold mt-4">
                {totalEntries}
              </p>

            </div>

            <div className="bg-black/40 border border-cyan-400/10 rounded-3xl p-8 text-center">

              <h3 className="text-cyan-400 text-lg">
                Dominant Mood
              </h3>

              <p className="text-4xl font-bold mt-4">
                {dominantMood}
              </p>

            </div>

            <div className="bg-black/40 border border-cyan-400/10 rounded-3xl p-8 text-center">

              <h3 className="text-cyan-400 text-lg">
                Wellness Score
              </h3>

              <p className="text-5xl font-bold mt-4">
                {Math.min(
                  100,
                  totalEntries * 10
                )}%
              </p>

            </div>

          </div>

          {/* Recent History */}
          <div className="mt-14">

            <h3 className="text-2xl font-bold mb-6">

              Recent Mood History

            </h3>

            <div className="space-y-4">

              {latestMoods.length > 0 ? (

                latestMoods.map(
                  (mood, index) => (

                    <motion.div

                      key={index}

                      initial={{
                        opacity: 0,
                        x: -30,
                      }}

                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}

                      className="
                        bg-black/40
                        border
                        border-cyan-400/10
                        rounded-2xl
                        p-5
                        flex
                        justify-between
                        items-center
                      "
                    >

                      <div className="flex items-center gap-4">

                        <span className="text-4xl">
                          {mood.emoji}
                        </span>

                        <div>

                          <p className="font-semibold">
                            {mood.label}
                          </p>

                          <p className="text-sm text-gray-400">
                            {mood.time}
                          </p>

                        </div>

                      </div>

                    </motion.div>

                  )
                )

              ) : (

                <p className="text-gray-400">
                  No mood history yet.
                </p>

              )}

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  )
}

export default MoodAnalytics