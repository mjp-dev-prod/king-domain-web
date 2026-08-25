import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Plus } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './how.scss'

const STEPS = [
  {
    n: '01',
    title: 'Prove what you can do',
    summary: 'Build a profile that carries evidence, not adjectives.',
    detail:
      'Verify your identity and student status, then attach the work itself — portfolio pieces, live projects, credentials, and optional skill assessments. New talent starts with something credible to show before a single client has hired them.',
  },
  {
    n: '02',
    title: 'Get discovered by real clients',
    summary: 'Be findable by the people actually looking to hire.',
    detail:
      'Individuals, creators, startups, agencies and small businesses describe what they need. Category, skills, proof, availability and reliability decide who surfaces — so a strong newcomer is not buried under whoever joined first.',
  },
  {
    n: '03',
    title: 'Work under protected terms',
    summary: 'Scope, delivery and payment states agreed up front.',
    detail:
      'Funds are secured before work begins. Delivery, revisions, approval and release each have a defined state, with an auditable history both sides can point to — and a structured dispute path if something goes wrong.',
  },
  {
    n: '04',
    title: 'Build standing that lasts',
    summary: 'Finished work becomes permanent professional credit.',
    detail:
      'Completion, reliability, repeat clients and reviews feed a standing that grows with real activity. It follows you from student to graduate to professional, instead of resetting the day you leave campus.',
  },
]

type StepProps = {
  step: (typeof STEPS)[number]
  isOpen: boolean
  onToggle: () => void
}

function Step({ step, isOpen, onToggle }: StepProps) {
  const panel = useRef<HTMLDivElement>(null)
  // Skip the open/close tween on first paint so the initially-open step
  // doesn't animate itself in on page load.
  const mounted = useRef(false)

  useEffect(() => {
    const el = panel.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!mounted.current || reduced) {
      mounted.current = true
      gsap.set(el, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 })
      return
    }

    gsap.killTweensOf(el)

    if (isOpen) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      const target = el.offsetHeight
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: target,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          // Back to auto so the panel reflows if the viewport changes.
          onComplete: () => gsap.set(el, { height: 'auto' }),
        },
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })
    }
  }, [isOpen])

  return (
    <div className={`how__step${isOpen ? ' is-open' : ''}`}>
      <button
        className="how__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`step-${step.n}`}
      >
        <span className="how__n">{step.n}</span>
        <span className="how__heading">
          <span className="how__title">{step.title}</span>
          <span className="how__summary">{step.summary}</span>
        </span>
        <span className="how__toggle" aria-hidden="true">
          <Plus size={17} strokeWidth={2.2} />
        </span>
      </button>

      <div className="how__panel" id={`step-${step.n}`} ref={panel}>
        <div className="how__panel-inner">
          <p>{step.detail}</p>
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const scope = useReveal<HTMLElement>()
  const [open, setOpen] = useState<string | null>('01')

  return (
    <section className="section section--light how" id="how" ref={scope}>
      <div className="shell">
        <div className="section__head reveal">
          <p className="eyebrow">The journey</p>
          <h2>From no track record to trusted professional.</h2>
          <p>
            The transaction is not the end of the story. Each finished contract is meant to
            leave behind evidence that makes the next one easier to win.
          </p>
        </div>

        <div className="how__steps reveal">
          {STEPS.map((step) => (
            <Step
              key={step.n}
              step={step}
              isOpen={open === step.n}
              onToggle={() => setOpen(open === step.n ? null : step.n)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
