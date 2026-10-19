'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Salut! Sunt JARVIS — asistentul tău AI. Cu ce te pot ajuta astăzi?',
    timestamp: new Date(),
  },
]

const AI_RESPONSES = [
  'Am înțeles. Procesez cererea ta acum.',
  'Sistemul funcționează normal. Toate modulele sunt active.',
  'Am analizat datele și sunt gata cu rezultatele.',
  'Cererea a fost executată cu succes. Mai ceva?',
  'Monitorizez sistemul încontinuu. Nu am observat anomalii.',
  'Memoria este sincronizată. Contextul păstrează.',
  'Task-ul a fost adăugat în coada de execuție.',
]

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative w-full h-screen flex">
      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto px-4 pt-20 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 mb-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-jarvis-cyan to-jarvis-violet flex items-center justify-center font-mono font-bold text-jarvis-bg">
            J
          </div>
          <div>
            <h2 className="font-mono text-sm text-jarvis-cyan font-bold">JARVIS Chat</h2>
            <p className="font-mono text-[10px] text-jarvis-muted">Asistent AI • Online</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-jarvis-emerald animate-pulse" />
            <span className="font-mono text-[10px] text-jarvis-emerald">Conectat</span>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-jarvis-cyan/10 border border-jarvis-cyan/30 text-jarvis-text'
                      : 'glass text-jarvis-text'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="font-mono text-[9px] text-jarvis-muted mt-2">
                    {message.timestamp.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass rounded-2xl px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-jarvis-cyan"
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-3 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie un mesaj..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-jarvis-text placeholder:text-jarvis-muted font-mono"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 rounded-lg bg-jarvis-cyan/10 border border-jarvis-cyan/30 text-jarvis-cyan font-mono text-xs hover:bg-jarvis-cyan/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Trimite
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}