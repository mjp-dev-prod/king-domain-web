const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export type WaitlistPayload = {
  email: string
  role: 'talent' | 'client'
  /** Selected service families. */
  categories: string[]
  /** Free-text for anything the categories don't cover. */
  note?: string
}

export type WaitlistResult = { ok: true } | { ok: false; error: string }

export async function joinWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  try {
    const response = await fetch(`${API_BASE}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) return { ok: true }

    const data = await response.json().catch(() => null)
    return {
      ok: false,
      error: data?.error ?? 'Something went wrong. Please try again.',
    }
  } catch {
    return {
      ok: false,
      error: 'Could not reach the server. Check your connection and try again.',
    }
  }
}
