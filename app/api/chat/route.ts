import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    // Call Hermes Agent
    const { stdout, stderr } = await execAsync(
      `hermes chat -q "${message.replace(/"/g, '\\"')}" --format text --max-turns 1`,
      { timeout: 60000, cwd: process.env.HERMES_CWD || '/Users/raul' }
    )

    const response = stdout.trim() || stderr.trim() || 'No response from Hermes Agent'

    return NextResponse.json({ response })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Hermes Agent error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from Hermes Agent', details: errorMessage },
      { status: 500 }
    )
  }
}