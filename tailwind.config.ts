import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          bg: '#020617',
          surface: '#0f172a',
          border: '#1e293b',
          cyan: '#22d3ee',
          emerald: '#34d399',
          violet: '#a78bfa',
          amber: '#fbbf24',
          rose: '#fb7185',
          orange: '#fb923c',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite reverse',
        'spin-slowest': 'spin 40s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scan': 'scanMove 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(34, 211, 238, 0.6)' },
        },
        scanMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config