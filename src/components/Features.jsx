import FeatureCard from "./FeatureCard"

function Features() {

  const featuresData = [
    {
      title: "AI Analytics",
      description: "Real-time intelligent insights powered by neural systems.",
    },
    {
      title: "3D Interface",
      description: "Immersive interactions with futuristic UI experience.",
    },
    {
      title: "Smart Security",
      description: "Advanced protection powered by AI systems.",
    },
  ]

  return (
    <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">

      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}

    </section>
  )
}

export default Features