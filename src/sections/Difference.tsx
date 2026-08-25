import { GraduationCap, Users, TrendingUp, Check, Lock } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './difference.scss'

const ESCROW_STATES = [
  { label: 'Funded', done: true },
  { label: 'In progress', done: true },
  { label: 'Submitted', done: true },
  { label: 'Approved', done: false },
  { label: 'Released', done: false },
]

const SUPPORTING = [
  {
    icon: TrendingUp,
    title: 'Reputation that compounds',
    body: 'Every finished contract raises standing — New Talent through to Top Talent — so good work makes the next job easier to win.',
  },
  {
    icon: GraduationCap,
    title: 'Real student identity',
    body: 'Profiles carry university, field, level and verified work history. Context a generic freelancer bio can never give a client.',
  },
  {
    icon: Users,
    title: 'Campus-seeded trust',
    body: 'Dense campus networks seed early supply and local credibility — without ever capping who a student is allowed to work for.',
  },
]

export function Difference() {
  const scope = useReveal<HTMLElement>()

  return (
    <section className="section difference" id="difference" ref={scope}>
      <div className="shell">
        <div className="section__head reveal">
          <p className="eyebrow">What&rsquo;s different</p>
          <h2>Built for the people who have no track record yet.</h2>
          <p>
            Most marketplaces reward whoever already has reviews. King Domain is designed
            around the moment before that — turning ability into evidence a client can act on.
          </p>
        </div>

        <div className="difference__featured">
          <article className="difference__card difference__card--wide reveal">
            <div className="difference__card-copy">
              <h3>Proof over claims</h3>
              <p>
                Portfolios, verified credentials, assessments and completed contracts sit on
                the profile as evidence — not adjectives. Clients judge what was actually
                delivered.
              </p>
            </div>

            <div className="difference__artifact" aria-hidden="true">
              <p className="difference__artifact-label">Evidence on file</p>
              <ul className="difference__evidence">
                <li>
                  <span className="difference__tick"><Check size={12} strokeWidth={3} /></span>
                  <span className="difference__ev-name">Brand identity — Lumen Co.</span>
                  <span className="difference__ev-tag">Contract</span>
                </li>
                <li>
                  <span className="difference__tick"><Check size={12} strokeWidth={3} /></span>
                  <span className="difference__ev-name">Motion reel, 2026</span>
                  <span className="difference__ev-tag">Portfolio</span>
                </li>
                <li>
                  <span className="difference__tick"><Check size={12} strokeWidth={3} /></span>
                  <span className="difference__ev-name">University enrolment</span>
                  <span className="difference__ev-tag">Verified</span>
                </li>
              </ul>
            </div>
          </article>

          <article className="difference__card difference__card--wide reveal">
            <div className="difference__card-copy">
              <h3>Protected transactions</h3>
              <p>
                Money is held under clear, stateful terms — funded, delivered, approved,
                released. Both sides know exactly where they stand instead of trusting a
                transfer and hoping.
              </p>
            </div>

            <div className="difference__artifact" aria-hidden="true">
              <p className="difference__artifact-label">
                <Lock size={12} strokeWidth={2.5} /> Contract #4821 — funds held
              </p>
              <ol className="difference__states">
                {ESCROW_STATES.map((state) => (
                  <li
                    key={state.label}
                    className={state.done ? 'is-done' : ''}
                  >
                    <span className="difference__state-dot" />
                    {state.label}
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </div>

        <div className="difference__grid">
          {SUPPORTING.map(({ icon: Icon, title, body }) => (
            <article className="difference__card reveal" key={title}>
              <span className="difference__icon">
                <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
