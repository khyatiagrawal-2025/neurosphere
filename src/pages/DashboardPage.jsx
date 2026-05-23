import Dashboard from "../components/Dashboard"
import { motion } from "framer-motion"

function DashboardPage() {

  return (

    <div className="px-6 md:px-10 py-20">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold text-center"
      >
        Neural <span className="text-cyan-400">Dashboard</span>
      </motion.h1>

      <p className="text-center text-gray-400 mt-6 max-w-2xl mx-auto">
        Monitor AI analytics, neural activity, system performance and futuristic intelligence metrics in real time.
      </p>

      <Dashboard />

    </div>
  )
}

export default DashboardPage