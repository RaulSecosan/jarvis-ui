'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import React from 'react'
import { useSettings } from './SettingsContext'

function GridFloor() {
  return (
    <gridHelper
      args={[100, 100, '#22d3ee', '#1e293b']}
      position={[0, -2, 0]}
    />
  )
}

function FloatingParticles({ count = 500 }: { count?: number }) {
  const particles = useRef<THREE.Points>(null)
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

function SceneSettings({ orbitRef }: { orbitRef: React.RefObject<any> }) {
  const { settings } = useSettings()
  const first = React.useRef(true)
  React.useEffect(() => {
    const controls = orbitRef.current
    if (!controls) return
    if (first.current) {
      first.current = false
    } else {
      controls.reset()
    }
    controls.enableZoom = settings.orbitEnabled
    controls.enablePan = settings.orbitEnabled
    controls.enableRotate = settings.orbitEnabled
    controls.autoRotate = settings.autoRotate && !settings.orbitEnabled
    controls.autoRotateSpeed = settings.orbitSpeed
    controls.update()
  }, [orbitRef, settings.orbitEnabled, settings.autoRotate, settings.orbitSpeed])
  return null
}

export default function Background3D() {
  const { settings } = useSettings()
  const orbitRef = React.useRef<any>(null)
  const colorMap = {
    cyan: '#22d3ee',
    emerald: '#34d399',
    violet: '#a78bfa',
  }
  const accentColor = colorMap[settings.colorScheme]

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 10, 50]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color={accentColor} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
          {settings.showGrid && <GridFloor />}
          <FloatingParticles count={settings.particleCount} />
          <CentralCore />
          <DataRings />
          {settings.showStars && (
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          )}
          <OrbitControls
            ref={orbitRef}
            makeDefault
            enableZoom={settings.orbitEnabled}
            enablePan={settings.orbitEnabled}
            enableRotate={settings.orbitEnabled}
            autoRotate={settings.autoRotate && !settings.orbitEnabled}
            autoRotateSpeed={settings.orbitSpeed}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
          />
          <SceneSettings orbitRef={orbitRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}