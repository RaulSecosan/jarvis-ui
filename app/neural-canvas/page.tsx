'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import NeuralCanvas from '@/components/NeuralCanvas'

const Background3D = dynamic(() => import('@/components/Background3D'), { ssr: false })

export default function NeuralCanvasPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Background3D />
      <div className="relative z-10">
        <Navigation />
        <NeuralCanvas />
      </div>
    </main>
  )
}