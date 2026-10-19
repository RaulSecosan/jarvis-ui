'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'AR-Shell', icon: '◈' },
  { href: '/neural-canvas', label: 'Neural Canvas', icon: '◉' },
  { href: '/chat', label: 'Chat', icon: '◬' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-jarvis-cyan animate-pulse-glow" />
          <span className="font-mono text-sm font-bold text-jarvis-cyan tracking-wider">
            JARVIS
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-mono text-xs tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-jarvis-cyan/10 text-jarvis-cyan border border-jarvis-cyan/30'
                      : 'text-jarvis-muted hover:text-jarvis-text hover:bg-jarvis-surface'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </motion.div>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-jarvis-emerald animate-pulse" />
            <span className="font-mono text-[10px] text-jarvis-emerald">ONLINE</span>
          </div>
          <div className="font-mono text-[10px] text-jarvis-muted">
            {new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}