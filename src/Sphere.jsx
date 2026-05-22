import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useRef } from "react"

function RotatingSphere() {

  const meshRef = useRef()

  useFrame(() => {

    meshRef.current.rotation.y += 0.003

    meshRef.current.position.y =
      Math.sin(Date.now() * 0.001) * 0.2
  })

  return (
    <mesh ref={meshRef}>

      <icosahedronGeometry args={[2, 1]} />

      <meshPhysicalMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={1}
        roughness={0}
        metalness={1}
        wireframe
      />

    </mesh>
  )
}

export default function Sphere() {

  return (

    <div className="h-[500px] w-full">

      <Canvas camera={{ position: [0, 0, 5] }}>

        <ambientLight intensity={0.5} />

        <directionalLight position={[2, 2, 2]} />

        <Stars
          radius={100}
          depth={50}
          count={4000}
          factor={4}
          fade
          speed={1}
        />

        <RotatingSphere />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
        />

      </Canvas>

    </div>
  )
}