import { Canvas } from "@react-three/fiber";

import {
  Environment,
  OrbitControls,
} from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import { Physics } from "@react-three/rapier";

import SkillBall from "./SkillBall";

const skills = [
  { image: "/tech/react.png", position: [-2, 1.5, 0] },
  { image: "/tech/node.png", position: [0, 2, 0] },
  { image: "/tech/js.png", position: [2, 1.5, 0] },
  { image: "/tech/mongo.png", position: [-1.8, 0, 0] },
  { image: "/tech/firebase.png", position: [1.8, 0, 0] },
  { image: "/tech/python.png", position: [0, -2, 0] },
  { image: "/tech/html.png", position: [-3, 2.5, 0] },
  { image: "/tech/css.png", position: [3, 2.5, 0] },
  { image: "/tech/tailwind.png", position: [-3, -1, 0] },
  { image: "/tech/git.png", position: [3, -1, 0] },
  { image: "/tech/github.png", position: [-1.2, -3, 0] },
  { image: "/tech/vscode.png", position: [1.2, -3, 0] },
];

export default function TechScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 15],
        fov: 45,
      }}
      // --- PERFORMANCE BOOST 1: Limit resolution & force good GPU ---
      dpr={[1, 1.5]} 
      performance={{ min: 0.5 }} 
      gl={{ 
        alpha: true, 
        antialias: false, // Turning off antialiasing saves A LOT of GPU power
        powerPreference: "high-performance" 
      }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />

      {/* Changed from "city" to "night" - smaller file size, loads faster */}
      <Environment preset="night" />

      <Physics gravity={[0, 0, 0]}>
        {skills.map((skill, i) => (
          <SkillBall
            key={i}
            image={skill.image}
            position={skill.position}
          />
        ))}
      </Physics>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.12}
      />

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.8} // --- PERFORMANCE BOOST 2: Only glow the balls, not the background!
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

    </Canvas>
  );
}