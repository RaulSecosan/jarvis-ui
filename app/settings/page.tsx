'use client'

import { motion } from 'framer-motion'
import { useSettings } from '@/components/SettingsContext'
import Navigation from '@/components/Navigation'
import Background3D from '@/components/Background3D'

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-jarvis-border last:border-0">
      <div>
        <div className="font-mono text-sm text-jarvis-text">{label}</div>
        <div className="font-mono text-xs text-jarvis-muted mt-1">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-all relative ${checked ? 'bg-jarvis-cyan/30' : 'bg-jarvis-surface'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${checked ? 'left-7 bg-jarvis-cyan' : 'left-1 bg-jarvis-muted'}`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings()

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Background3D />
      <div className="relative z-10 h-full overflow-y-auto">
        <Navigation />
        <div className="max-w-2xl mx-auto px-6 pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">⚙</span>
              <div>
                <h1 className="font-mono text-xl font-bold text-jarvis-cyan">Setări</h1>
                <p className="font-mono text-xs text-jarvis-muted">Personalizează experiența JARVIS</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-mono text-xs text-jarvis-cyan uppercase tracking-wider mb-4">Control 3D Orbital (CAD)</h3>
              <Toggle
                label="Mod Orbital CAD"
                description="Activează rotirea, zoom-ul și panoramarea scenei 3D ca în software-ul CAD"
                checked={settings.orbitEnabled}
                onChange={(v) => updateSettings({ orbitEnabled: v })}
              />
              <Toggle
                label="Auto-Rotate"
                description="Rotește automat scena 3D când modul orbital este dezactivat"
                checked={settings.autoRotate}
                onChange={(v) => updateSettings({ autoRotate: v })}
              />
              <div className="py-4 border-b border-jarvis-border">
                <div className="font-mono text-sm text-jarvis-text">Viteză Rotație</div>
                <div className="font-mono text-xs text-jarvis-muted mt-1">Controlează viteza de auto-rotire a scenei</div>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={settings.orbitSpeed}
                  onChange={(e) => updateSettings({ orbitSpeed: parseFloat(e.target.value) })}
                  className="w-full mt-3 accent-cyan-400"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-mono text-xs text-jarvis-cyan uppercase tracking-wider mb-4">Vizualizare 3D</h3>
              <Toggle
                label="Arată Grid"
                description="Afișează grila de perspectivă 3D"
                checked={settings.showGrid}
                onChange={(v) => updateSettings({ showGrid: v })}
              />
              <Toggle
                label="Arată Stele"
                description="Afișează fundalul cu stele"
                checked={settings.showStars}
                onChange={(v) => updateSettings({ showStars: v })}
              />
              <div className="py-4 border-b border-jarvis-border">
                <div className="font-mono text-sm text-jarvis-text">Număr Particule</div>
                <div className="font-mono text-xs text-jarvis-muted mt-1"> particule animate în scenă</div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={settings.particleCount}
                  onChange={(e) => updateSettings({ particleCount: parseInt(e.target.value) })}
                  className="w-full mt-3 accent-cyan-400"
                />
              </div>
              <div className="py-4 border-b border-jarvis-border">
                <div className="font-mono text-sm text-jarvis-text">Schemă Culori</div>
                <div className="font-mono text-xs text-jarvis-muted mt-1">Culoarea accentului scenei 3D</div>
                <div className="flex gap-3 mt-3">
                  {(['cyan', 'emerald', 'violet'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => updateSettings({ colorScheme: c })}
                      className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${settings.colorScheme === c ? 'bg-jarvis-cyan/20 text-jarvis-cyan border border-jarvis-cyan/40' : 'bg-jarvis-surface text-jarvis-muted border border-jarvis-border'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-jarvis-cyan uppercase tracking-wider mb-4">Motor Chat</h3>
              <div className="py-4 border-b border-jarvis-border">
                <div className="font-mono text-sm text-jarvis-text">Engine</div>
                <div className="font-mono text-xs text-jarvis-muted mt-1">Alege motorul AI pentru chat</div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => updateSettings({ chatEngine: 'hermes' })}
                    className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${settings.chatEngine === 'hermes' ? 'bg-jarvis-emerald/20 text-jarvis-emerald border border-jarvis-emerald/40' : 'bg-jarvis-surface text-jarvis-muted border border-jarvis-border'}`}
                  >
                    Hermes Agent
                  </button>
                  <button
                    onClick={() => updateSettings({ chatEngine: 'mock' })}
                    className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${settings.chatEngine === 'mock' ? 'bg-jarvis-amber/20 text-jarvis-amber border border-jarvis-amber/40' : 'bg-jarvis-surface text-jarvis-muted border border-jarvis-border'}`}
                  >
                    Mock (Test)
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}