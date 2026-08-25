import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ShieldCheck, BadgeCheck, ArrowRight } from 'lucide-react'
import { track } from '../lib/analytics'
import './hero.scss'

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.hero__anim', { opacity: 1, y: 0 })
        return
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__badge', { opacity: 0, y: 14, duration: 0.6 })
        .from('.hero__line span', { yPercent: 115, duration: 1, stagger: 0.09 }, '-=0.25')
        .from('.hero__sub', { opacity: 0, y: 18, duration: 0.7 }, '-=0.55')
        .from('.hero__actions', { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
        .from('.hero__proof', { opacity: 0, y: 18, duration: 0.7 }, '-=0.55')
        .from('.hero__card', { opacity: 0, y: 34, duration: 1 }, '-=0.7')
        .from('.hero__chip', { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.12 }, '-=0.5')
    },
    { scope },
  )

  return (
    <section className="hero" id="top" ref={scope}>
      <div className="shell hero__inner">
        <div className="hero__left">
          <p className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            <span className="hero__badge-long">
              In active development — building in public
            </span>
            <span className="hero__badge-short">Building in public</span>
          </p>

          <h1 className="hero__title">
            <span className="hero__line">
              <span>Proof beats</span>
            </span>
            <span className="hero__line">
              <span className="hero__title-em">promises.</span>
            </span>
          </h1>

          <p className="hero__sub">
            King Domain is a marketplace where student and emerging talent prove what they can
            do, get paid under protected terms, and build a reputation that follows them long
            after graduation.
          </p>

          <div className="hero__actions">
            <a className="hero__cta" href="#waitlist" onClick={() => track.ctaClicked('hero')}>
              Join the waitlist
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a className="hero__ghost" href="#how">
              See how it works
            </a>
          </div>

          <p className="hero__proof">
            For students, graduates and the clients who want to hire them.
          </p>
        </div>

        <div className="hero__right" aria-hidden="true">
          <div className="hero__card">
            <div className="hero__card-head">
              <div className="hero__avatar">AO</div>
              <div>
                <p className="hero__card-name">
                  Ada O.
                  <BadgeCheck size={15} className="hero__verified" strokeWidth={2.4} />
                </p>
                <p className="hero__card-meta">Motion Design · 3rd year</p>
              </div>
            </div>

            <div className="hero__stats">
              <div>
                <span className="hero__stat-n">14</span>
                <span className="hero__stat-l">Projects</span>
              </div>
              <div>
                <span className="hero__stat-n">100%</span>
                <span className="hero__stat-l">On time</span>
              </div>
              <div>
                <span className="hero__stat-n">6</span>
                <span className="hero__stat-l">Repeat clients</span>
              </div>
            </div>

            <div className="hero__tier">
              <span className="hero__tier-label">Standing</span>
              <span className="hero__tier-value">Trusted Talent</span>
              <div className="hero__tier-bar">
                <i style={{ width: '72%' }} />
              </div>
            </div>

            <ul className="hero__evidence">
              <li>
                <BadgeCheck size={14} strokeWidth={2.4} /> University verified
              </li>
              <li>
                <BadgeCheck size={14} strokeWidth={2.4} /> Portfolio reviewed
              </li>
              <li>
                <BadgeCheck size={14} strokeWidth={2.4} /> 14 completed contracts
              </li>
            </ul>
          </div>

          <div className="hero__chip hero__chip--escrow">
            <ShieldCheck size={15} strokeWidth={2.2} />
            <div>
              <p>Funds protected</p>
              <span>Released on approval</span>
            </div>
          </div>

          <div className="hero__chip hero__chip--rep">
            <p>+1 completed contract</p>
            <span>Reputation updated</span>
          </div>
        </div>
      </div>
    </section>
  )
}
