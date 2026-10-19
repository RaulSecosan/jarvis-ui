'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import ARShell from '@/components/ARShell'

const Background3D = dynamic(() => import('@/components/Background3D'), { ssr: false })

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Background3D />
      <div className="relative z-10">
        <Navigation />
        <ARShell />
      </div>
    </main>
  )
}