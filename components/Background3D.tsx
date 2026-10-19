'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function GridFloor() {
  return (
    <gridHelper
      args={[100, 100, '#22d3ee', '#1e293b']}
      position={[0, -2, 0]}
    />
  )
}

function FloatingParticles() {
  const particles = useRef<THREE.Points>(null)
  const count = 500
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = Math.random() * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function CentralCore() {
  const mesh = useRef<THREE.Mesh>(null)

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

function DataRings() {
  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#a78bfa" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.25} />
      </mesh>
    </>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 10, 50]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
          <GridFloor />
          <FloatingParticles />
          <CentralCore />
          <DataRings />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}