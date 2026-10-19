'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const nodes = [
  { id: 'core', label: 'Core AI', x: 50, y: 50, size: 80, color: '#22d3ee' },
  { id: 'llm', label: 'LLM', x: 20, y: 25, size: 60, color: '#a78bfa' },
  { id: 'memory', label: 'Memory', x: 80, y: 25, size: 60, color: '#34d399' },
  { id: 'browser', label: 'Browser', x: 15, y: 65, size: 60, color: '#fbbf24' },
  { id: 'desktop', label: 'Desktop', x: 85, y: 65, size: 60, color: '#fb923c' },
  { id: 'voice', label: 'Voice', x: 35, y: 80, size: 60, color: '#fb7185' },
  { id: 'mcp', label: 'MCP', x: 65, y: 80, size: 60, color: '#a78bfa' },
  { id: 'tools', label: 'Tools', x: 50, y: 15, size: 50, color: '#34d399' },
]

const connections = [
  ['core', 'llm'],
  ['core', 'memory'],
  ['core', 'browser'],
  ['core', 'desktop'],
  ['core', 'voice'],
  ['core', 'mcp'],
  ['core', 'tools'],
  ['llm', 'memory'],
  ['browser', 'desktop'],
  ['voice', 'mcp'],
]

function getNode(id: string) {
  return nodes.find(n => n.id === id)!
}

function ConnectionLine({ from, to }: { from: string; to: string }) {
  const fromNode = getNode(from)
  const toNode = getNode(to)

  return (
    <motion.line
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 1, delay: 0.5 }}
      x1={`${fromNode.x}%`}
      y1={`${fromNode.y}%`}
      x2={`${toNode.x}%`}
      y2={`${toNode.y}%`}
      stroke="#22d3ee"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
  )
}

function Node({ node, index }: { node: typeof nodes[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.2, zIndex: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="absolute cursor-pointer"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        animate={hovered ? { boxShadow: `0 0 30px ${node.color}60` } : {}}
        className="rounded-full flex items-center justify-center font-mono text-[10px] font-bold"
        style={{
          width: node.size,
          height: node.size,
          background: `${node.color}15`,
          border: `1px solid ${node.color}60`,
          color: node.color,
        }}
      >
        {node.label}
      </motion.div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass rounded-lg p-3 whitespace-nowrap z-30"
        >
          <div className="font-mono text-[10px] text-jarvis-muted">Status:</div>
          <div className="font-mono text-[11px]" style={{ color: node.color }}>Active</div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function NeuralCanvas() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 scan-line" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20"
      >
        <h2 className="font-mono text-2xl font-bold text-jarvis-violet text-glow-cyan mb-2">
          Neural Canvas
        </h2>
        <p className="font-mono text-xs text-jarvis-muted">
          Visualizează și controlează AI-ul printr-un spațiu interactiv
        </p>
      </motion.div>

      {/* Canvas */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {connections.map(([from, to]) => (
          <ConnectionLine key={`${from}-${to}`} from={from} to={to} />
        ))}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {nodes.map((node, i) => (
          <Node key={node.id} node={node} index={i} />
        ))}
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-1/2 -translate-y-1/2 right-8 glass rounded-xl p-4 w-56 z-20"
      >
        <h4 className="font-mono text-[10px] text-jarvis-violet mb-3 uppercase tracking-wider">
          System Log
        </h4>
        <div className="space-y-1 font-mono text-[9px] text-jarvis-muted">
          <div>[00:00:01] Core initialized</div>
          <div>[00:00:02] Memory loaded: 1,247 items</div>
          <div>[00:00:03] Browser monitor: active</div>
          <div>[00:00:04] Voice: listening</div>
          <div>[00:00:05] Desktop: observing</div>
          <div>[00:00:06] MCP: connected</div>
          <div>[00:00:07] Fusion 360: ready</div>
          <div className="text-jarvis-emerald">[00:00:08] All systems nominal</div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-8 glass rounded-xl p-4 z-20"
      >
        <h4 className="font-mono text-[10px] text-jarvis-cyan mb-3 uppercase tracking-wider">
          Legenda
        </h4>
        <div className="space-y-2">
          {nodes.slice(0, 5).map(node => (
            <div key={node.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: `${node.color}60`, border: `1px solid ${node.color}` }}
              />
              <span className="font-mono text-[10px] text-jarvis-muted">{node.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}