import { useState, useRef, useEffect, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ArrowLeft, Check, Plus } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { joinWaitlist } from '../lib/api'
import { CATEGORIES } from '../lib/categories'
import { track } from '../lib/analytics'
import './waitlist.scss'

type State = 'idle' | 'sending' | 'done' | 'error'
type Role = 'talent' | 'client'

const COPY = {
  talent: {
    prompt: 'What do you do?',
    hint: 'Pick everything you could take on. This shapes the categories we build first.',
    otherLabel: 'Something else you offer',
    otherPlaceholder: 'e.g. 3D modelling, data annotation…',
  },
  client: {
    prompt: 'What do you need?',
    hint: 'Pick what you would hire for. This tells us which talent to onboard first.',
    otherLabel: 'Something else you need',
    otherPlaceholder: 'e.g. pitch deck design, subtitling…',
  },
} as const

export function Waitlist() {
  const scope = useReveal<HTMLElement>()
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<Role>('talent')
  const [picked, setPicked] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  const stageRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  const startedTracked = useRef(false)

  function trackFormStart() {
    if (startedTracked.current) return
    startedTracked.current = true
    track.waitlistStepOneStarted()
  }

  // Slide between steps rather than snapping.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.fromTo(
      el,
      { opacity: 0, x: step === 2 ? 18 : -18 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    )
  }, [step])

  const hasPick = picked.length > 0 || note.trim().length > 0

  function toggle(category: string) {
    trackFormStart()
    setPicked((current) => {
      const willSelect = !current.includes(category)
      track.categoryToggled(category, willSelect)
      return willSelect ? [...current, category] : current.filter((c) => c !== category)
    })
  }

  function selectRole(next: Role) {
    trackFormStart()
    setRole(next)
    setPicked([])
    track.roleSelected(next)
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setMessage('')

    const result = await joinWaitlist({
      email,
      role,
      categories: picked,
      note: note.trim() || undefined,
    })

    if (result.ok) {
      setState('done')
      track.submitted(role, picked.length, note.trim().length > 0)
    } else {
      setState('error')
      setMessage(result.error)
      track.error(result.error)
    }
  }

  const copy = COPY[role]

  return (
    <section className="section waitlist" id="waitlist" ref={scope}>
      <div className="shell waitlist__inner">
        <div className="reveal">
          <p className="eyebrow eyebrow--center">Early access</p>

          <h2 className="waitlist__title">
            Do you believe students
            <br />
            deserve <span className="waitlist__em">better than this?</span>
          </h2>

          <p className="waitlist__sub">
            We are building it now, in the open. Tell us what you bring or what you need, and
            we&rsquo;ll bring you in early.
          </p>
        </div>

        {state === 'done' ? (
          <div className="waitlist__success reveal" role="status">
            <span className="waitlist__success-icon">
              <Check size={18} strokeWidth={2.6} aria-hidden="true" />
            </span>
            <div>
              <p className="waitlist__success-title">You&rsquo;re on the list.</p>
              <p className="waitlist__success-body">
                {picked.length > 0
                  ? `We've noted ${picked.slice(0, 2).join(' and ')}${
                      picked.length > 2 ? ` +${picked.length - 2} more` : ''
                    }. We'll be in touch before the first cohort opens.`
                  : "We'll be in touch before the first cohort opens."}
              </p>
            </div>
          </div>
        ) : (
          <form className="waitlist__form reveal" onSubmit={onSubmit} noValidate>
            <ol className="waitlist__steps" aria-hidden="true">
              <li className={step === 1 ? 'is-current' : 'is-done'}>
                <span>1</span> You
              </li>
              <li className={step === 2 ? 'is-current' : ''}>
                <span>2</span> Email
              </li>
            </ol>

            <div className="waitlist__stage" ref={stageRef}>
              {step === 1 ? (
                <>
                  <fieldset className="waitlist__roles">
                    <legend className="visually-hidden">I am joining as</legend>
                    <label className={role === 'talent' ? 'is-active' : ''}>
                      <input
                        type="radio"
                        name="role"
                        value="talent"
                        checked={role === 'talent'}
                        onChange={() => selectRole('talent')}
                      />
                      I have skills to offer
                    </label>
                    <label className={role === 'client' ? 'is-active' : ''}>
                      <input
                        type="radio"
                        name="role"
                        value="client"
                        checked={role === 'client'}
                        onChange={() => selectRole('client')}
                      />
                      I want to hire
                    </label>
                  </fieldset>

                  <p className="waitlist__prompt">{copy.prompt}</p>
                  <p className="waitlist__hint">{copy.hint}</p>

                  <div className="waitlist__chips" role="group" aria-label={copy.prompt}>
                    {CATEGORIES.map((category) => {
                      const on = picked.includes(category)
                      return (
                        <button
                          type="button"
                          key={category}
                          className={`waitlist__chip${on ? ' is-on' : ''}`}
                          onClick={() => toggle(category)}
                          aria-pressed={on}
                        >
                          {on ? (
                            <Check size={13} strokeWidth={3} aria-hidden="true" />
                          ) : (
                            <Plus size={13} strokeWidth={2.4} aria-hidden="true" />
                          )}
                          {category}
                        </button>
                      )
                    })}
                  </div>

                  <label className="waitlist__other">
                    <span className="visually-hidden">{copy.otherLabel}</span>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => {
                        trackFormStart()
                        setNote(e.target.value)
                      }}
                      placeholder={copy.otherPlaceholder}
                      maxLength={140}
                    />
                  </label>

                  <button
                    type="button"
                    className="waitlist__next"
                    onClick={() => {
                      setStep(2)
                      track.stepTwoReached(role, picked.length)
                    }}
                    disabled={!hasPick}
                  >
                    {hasPick ? 'Continue' : 'Pick at least one'}
                    {hasPick && <ArrowRight size={16} strokeWidth={2.3} aria-hidden="true" />}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="waitlist__back"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={14} strokeWidth={2.3} aria-hidden="true" />
                    Back
                  </button>

                  <p className="waitlist__prompt">Where do we reach you?</p>

                  <p className="waitlist__recap">
                    {role === 'talent' ? 'Offering' : 'Looking for'}:{' '}
                    <strong>
                      {[...picked, ...(note.trim() ? [note.trim()] : [])].join(', ')}
                    </strong>
                  </p>

                  <div className="waitlist__field">
                    <label className="visually-hidden" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-describedby={state === 'error' ? 'waitlist-error' : undefined}
                    />
                    <button type="submit" disabled={state === 'sending'}>
                      {state === 'sending' ? 'Joining…' : 'Join waitlist'}
                      {state !== 'sending' && (
                        <ArrowRight size={16} strokeWidth={2.3} aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {state === 'error' && (
                    <p className="waitlist__error" id="waitlist-error" role="alert">
                      {message}
                    </p>
                  )}
                </>
              )}
            </div>

            <p className="waitlist__fine">
              No spam, no forwarding your address. Just early access and honest progress
              updates.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
