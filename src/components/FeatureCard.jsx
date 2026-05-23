import Tilt from "react-parallax-tilt"

function FeatureCard({ title, description }) {
  return (
    <Tilt>
      <div className="bg-white/5 border border-cyan-400/20 p-8 rounded-3xl backdrop-blur-md hover:scale-105 transition duration-300">

        <h3 className="text-cyan-400 text-2xl font-bold">
          {title}
        </h3>

        <p className="text-gray-400 mt-2">
          {description}
        </p>

      </div>
    </Tilt>
  )
}

export default FeatureCard