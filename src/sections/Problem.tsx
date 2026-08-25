import { useReveal } from '../hooks/useReveal'
import './problem.scss'

const COLUMNS = [
  {
    label: 'For talent',
    title: 'Skill without proof goes unseen.',
    points: [
      'Real ability, but no professional history to point at.',
      'Work found through group chats, referrals and luck.',
      'No reviews means no clients — which means no reviews.',
      'Payment depends on trusting a stranger to pay up.',
    ],
  },
  {
    label: 'For clients',
    title: 'Talent without proof is a gamble.',
    points: [
      'No reliable way to tell competence from confidence.',
      'Search scattered across five platforms and DMs.',
      'No recourse when work arrives late, or not at all.',
      'Cheaper talent usually means carrying more risk.',
    ],
  },
]

export function Problem() {
  const scope = useReveal<HTMLElement>()

  return (
    <section className="section section--light problem" id="problem" ref={scope}>
      <div className="shell">
        <div className="section__head reveal">
          <p className="eyebrow">The gap</p>
          <h2>Two sides of the same broken market.</h2>
          <p>
            Students are not short of ability. They are short of visibility, proof and safe
            ways to get paid. Clients have the opposite problem — and neither side can solve
            it alone.
          </p>
        </div>

        <div className="problem__grid">
          {COLUMNS.map((col) => (
            <div className="problem__col reveal" key={col.label}>
              <p className="problem__label">{col.label}</p>
              <h3 className="problem__title">{col.title}</h3>
              <ul className="problem__list">
                {col.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
