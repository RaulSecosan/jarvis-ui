'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function StatusPanel({ title, items, position }: { title: string; items: string[]; position: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`absolute ${position} glass rounded-xl p-4 w-48`}
    >
      <h4 className="font-mono text-[10px] text-jarvis-cyan mb-3 uppercase tracking-wider">
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-jarvis-muted">{item}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-jarvis-emerald animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CentralCore() {
  const [message, setMessage] = useState('Sistem Online')
  const messages = [
    'Sistem Online',
    'Toate modulele active',
    'Pregătit pentru comenzi',
    'Monitorizare activă',
    'Memorie sincronizată',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
      {/* Outer Rings */}
      <div className="relative w-80 h-80">
        <div className="absolute inset-0 rounded-full border border-jarvis-cyan/20 ring-rotate" />
        <div className="absolute inset-4 rounded-full border border-jarvis-violet/20 ring-rotate-reverse" />
        <div className="absolute inset-8 rounded-full border border-jarvis-emerald/20 ring-rotate" style={{ animationDuration: '25s' }} />
        
        {/* Core */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-12 rounded-full bg-gradient-to-br from-jarvis-cyan/20 to-jarvis-violet/20 border border-jarvis-cyan/40 flex items-center justify-center pulse-glow"
        >
          <div className="text-center">
            <div className="font-mono text-4xl font-bold text-jarvis-cyan text-glow-cyan mb-2">J</div>
            <div className="font-mono text-[10px] text-jarvis-muted tracking-widest uppercase">Core</div>
          </div>
        </motion.div>
      </div>

      {/* Message */}
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 font-mono text-sm text-jarvis-cyan"
      >
        {message}
      </motion.div>
    </div>
  )
}

function QuickAction({ label, icon, delay }: { label: string; icon: string; delay: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-jarvis-cyan/40 transition-all cursor-pointer"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-mono text-[10px] text-jarvis-muted">{label}</span>
    </motion.button>
  )
}

function SystemMetrics() {
  const [cpu, setCpu] = useState(23)
  const [ram, setRam] = useState(4.2)

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 30 + 15))
      setRam(Math.random() * 3 + 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-xl p-4 flex items-center gap-8"
    >
      <div className="text-center">
        <div className="font-mono text-[10px] text-jarvis-muted mb-1">CPU</div>
        <div className="font-mono text-lg text-jarvis-cyan">{cpu}%</div>
      </div>
      <div className="w-px h-8 bg-jarvis-border" />
      <div className="text-center">
        <div className="font-mono text-[10px] text-jarvis-muted mb-1">RAM</div>
        <div className="font-mono text-lg text-jarvis-violet">{ram.toFixed(1)}GB</div>
      </div>
      <div className="w-px h-8 bg-jarvis-border" />
      <div className="text-center">
        <div className="font-mono text-[10px] text-jarvis-muted mb-1">GPU</div>
        <div className="font-mono text-lg text-jarvis-emerald">Activ</div>
      </div>
      <div className="w-px h-8 bg-jarvis-border" />
      <div className="text-center">
        <div className="font-mono text-[10px] text-jarvis-muted mb-1">Net</div>
        <div className="font-mono text-lg text-jarvis-amber">1.2ms</div>
      </div>
    </motion.div>
  )
}

export default function ARShell() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 scan-line" />

      {/* Status Panels */}
      <StatusPanel
        title="Module Active"
        items={['Browser', 'Desktop', 'Voice', 'MCP', 'Memory']}
        position="top-24 left-8"
      />
      <StatusPanel
        title="Task-uri"
        items={['Monitorizare', 'Observare', 'Procesare', 'Sync']}
        position="top-24 right-8"
      />

      {/* Central Core */}
      <CentralCore />

      {/* Quick Actions */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-4">
        <QuickAction label="Scan Desktop" icon="🖥" delay={0.5} />
        <QuickAction label="Browser" icon="🌐" delay={0.6} />
        <QuickAction label="Voice" icon="🎤" delay={0.7} />
        <QuickAction label="MCP" icon="⚡" delay={0.8} />
      </div>

      {/* System Metrics */}
      <SystemMetrics />
    </div>
  )
}