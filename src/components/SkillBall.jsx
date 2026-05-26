import {
  Float,
  Decal,
  useTexture,
} from "@react-three/drei";

import { RigidBody } from "@react-three/rapier";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import { useRef } from "react";

import * as THREE from "three";

export default function SkillBall({ image, position }) {

  const texture = useTexture(image);

  const meshRef = useRef();
  const bodyRef = useRef();

  const { mouse } = useThree();

  useFrame((state) => {

    if (!meshRef.current || !bodyRef.current) return;

    const t = state.clock.elapsedTime;

    /* ----------------------------------------
       FLOATING BOUNCE
    ---------------------------------------- */

    meshRef.current.position.y =
      Math.sin(t * 3 + position[0]) * 0.22;

    /* ----------------------------------------
       SMOOTH ROTATION
    ---------------------------------------- */

    meshRef.current.rotation.y += 0.0002;

    /* ----------------------------------------
       MOUSE REACTION
    ---------------------------------------- */

    meshRef.current.rotation.x =
      THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.45,
        0.04
      );

    meshRef.current.rotation.z =
      THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        mouse.x * 0.45,
        0.04
      );

    /* ----------------------------------------
       CROWD-LIKE MOVEMENT
    ---------------------------------------- */

    bodyRef.current.applyImpulse(
      {
        x:
          mouse.x * 0.0012 +
          Math.sin(t + position[0]) * 0.0003,

        y:
          mouse.y * 0.0012 +
          Math.cos(t + position[1]) * 0.0003,

        z: 0,
      },
      true
    );
  });

  return (
    <RigidBody
      ref={bodyRef}

      colliders="ball"

      position={position}

      restitution={1.85}

      friction={0.05}

      linearDamping={3}

      angularDamping={4}
    >

      <Float
        speed={1.8}
        rotationIntensity={1}
        floatIntensity={1.5}
      >

        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
        >

          {/* SPHERE */}
          <sphereGeometry args={[1, 64, 64]} />

          {/* HOLOGRAPHIC GLASS */}
          <meshPhysicalMaterial
            color="#303030"

            transparent
            opacity={0.50}

            roughness={0.1}
            metalness={0.1}

            transmission={1}
            thickness={2}

            clearcoat={0.5}
            clearcoatRoughness={0}

            ior={1.5}

            envMapIntensity={3}

            reflectivity={1}

            emissive="#060606"
            emissiveIntensity={0.2}
            />

          {/* FRONT LOGO */}
          <Decal
            position={[0, 0, 0.76]}
            rotation={[0, 0, 0]}
            scale={1.45}
            map={texture}
          />

          {/* BACK LOGO */}
          <Decal
            position={[0, 0, -0.76]}
            rotation={[0, Math.PI, 0]}
            scale={1.5}
            map={texture}
          />

        </mesh>

      </Float>

    </RigidBody>
  );
}