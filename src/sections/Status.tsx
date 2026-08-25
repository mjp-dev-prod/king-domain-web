import { useReveal } from '../hooks/useReveal'
import './status.scss'

const MILESTONES = [
  { label: 'Product vision defined', state: 'done' },
  { label: 'Trust & transaction model in design', state: 'active' },
  { label: 'Private beta with early cohort', state: 'next' },
  { label: 'Open marketplace', state: 'next' },
]

export function Status() {
  const scope = useReveal<HTMLElement>()

  return (
    <section className="status" ref={scope}>
      <div className="shell">
        <div className="status__inner reveal">
          <p className="status__label">Where we are</p>

          <ol className="status__track">
            {MILESTONES.map((m) => (
              <li className={`status__item is-${m.state}`} key={m.label}>
                <span className="status__dot" aria-hidden="true" />
                <span className="status__text">{m.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
