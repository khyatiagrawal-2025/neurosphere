import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function Dashboard() {

  const [stats, setStats] = useState({
    neural: 95,
    processing: 12000,
    security: 99,
    health: 98,
  })

  useEffect(() => {

    const interval = setInterval(() => {

      setStats({
        neural: Math.floor(Math.random() * 10) + 90,
        processing: Math.floor(Math.random() * 5000) + 10000,
        security: Math.floor(Math.random() * 5) + 95,
        health: Math.floor(Math.random() * 3) + 97,
      })

    }, 2000)

    return () => clearInterval(interval)

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
    <section className="px-10 py-20">

      <div className="bg-white/5 border border-cyan-400/20 rounded-[40px] p-10 backdrop-blur-xl">

        <h2 className="text-4xl font-bold text-center">
          AI Powered <span className="text-cyan-400">Dashboard</span>
        </h2>

        <p className="text-gray-400 text-center mt-4">
          Real-time neural system monitoring and analytics.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          {cards.map((card, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-black/40 p-6 rounded-3xl text-center border border-cyan-400/10"
            >

              <h3 className="text-cyan-400">
                {card.title}
              </h3>

              <p className="text-3xl font-bold mt-2">
                {card.value}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Dashboard