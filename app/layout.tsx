import type { Metadata } from 'next'
import './globals.css'
import { SettingsProvider } from '@/components/SettingsContext'

export const metadata: Metadata = {
  title: 'JARVIS — AI Assistant',
  description: 'Just A Rather Very Intelligent System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="bg-jarvis-bg text-jarvis-text font-sans">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}