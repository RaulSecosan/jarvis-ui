import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}