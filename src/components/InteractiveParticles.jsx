import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

function InteractiveParticles() {

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  return (

    <Particles

      id="tsparticles"

      init={particlesInit}

      options={{

        fullScreen: {
          enable: false,
        },

        background: {
          color: "transparent",
        },

        fpsLimit: 60,

        particles: {

          number: {
            value: 80,
          },

          color: {
            value: "#22d3ee",
          },

          links: {
            enable: true,
            color: "#22d3ee",
            distance: 120,
            opacity: 0.3,
            width: 1,
          },

          move: {
            enable: true,
            speed: 1,
          },

          opacity: {
            value: 0.5,
          },

          size: {
            value: {
              min: 1,
              max: 4,
            },
          },
        },

        interactivity: {

          events: {

            onHover: {
              enable: true,
              mode: "grab",
            },

            onClick: {
              enable: true,
              mode: "push",
            },
          },

          modes: {

            grab: {
              distance: 180,
              links: {
                opacity: 1,
              },
            },

            push: {
              quantity: 5,
            },
          },
        },

        detectRetina: true,
      }}

      className="
        absolute
        inset-0
        z-0
      "
    />
  )
}

export default InteractiveParticles