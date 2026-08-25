import posthog from 'posthog-js'

const KEY = import.meta.env.VITE_POSTHOG_KEY
const HOST = import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com'

let initialized = false

/** Initialise PostHog once, client-side only. Safe to call from SSG code. */
export function initAnalytics() {
  if (initialized || typeof window === 'undefined' || !KEY) return
  initialized = true

  posthog.init(KEY, {
    api_host: HOST,
    // Pageviews are captured explicitly on route settle instead, since this
    // is a single-page app with in-page anchor navigation, not real routes.
    capture_pageview: false,
    // No session replay, no PII capture — see analytics scope note in
    // king-domain-mobile/CLAUDE.md.
    disable_session_recording: true,
    autocapture: false,
    persistence: 'localStorage',
  })

  posthog.capture('$pageview')
}

type Role = 'talent' | 'client'

export const track = {
  waitlistStepOneStarted: () => posthog.capture('waitlist_step_1_started'),

  roleSelected: (role: Role) => posthog.capture('waitlist_role_selected', { role }),

  categoryToggled: (category: string, selected: boolean) =>
    posthog.capture('waitlist_category_toggled', { category, selected }),

  stepTwoReached: (role: Role, categoryCount: number) =>
    posthog.capture('waitlist_step_2_reached', { role, category_count: categoryCount }),

  submitted: (role: Role, categoryCount: number, hasNote: boolean) =>
    posthog.capture('waitlist_submitted', {
      role,
      category_count: categoryCount,
      has_note: hasNote,
    }),

  error: (reason: string) => posthog.capture('waitlist_error', { reason }),

  ctaClicked: (location: 'hero' | 'nav' | 'footer') =>
    posthog.capture('cta_clicked', { location }),
}
