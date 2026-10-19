'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Settings {
  orbitEnabled: boolean
  orbitSpeed: number
  autoRotate: boolean
  showGrid: boolean
  showStars: boolean
  particleCount: number
  colorScheme: 'cyan' | 'emerald' | 'violet'
  chatEngine: 'hermes' | 'mock'
}

const defaultSettings: Settings = {
  orbitEnabled: false,
  orbitSpeed: 0.5,
  autoRotate: true,
  showGrid: true,
  showStars: true,
  particleCount: 500,
  colorScheme: 'cyan',
  chatEngine: 'hermes',
}

const SettingsContext = createContext<{
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
}>({
  settings: defaultSettings,
  updateSettings: () => {},
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jarvis-settings')
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) }
        } catch {
          return defaultSettings
        }
      }
    }
    return defaultSettings
  })

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates }
      if (typeof window !== 'undefined') {
        localStorage.setItem('jarvis-settings', JSON.stringify(next))
      }
      return next
    })
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}