import { track } from '../lib/analytics'
import './nav.scss'

export function Nav() {
  return (
    <header className="nav">
      <div className="shell nav__inner">
        <a className="nav__mark" href="#top" aria-label="King Domain, home">
          <span className="nav__mark-kd">KD</span>
          <span className="nav__mark-full">King Domain</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#problem">The problem</a>
          <a href="#difference">What&rsquo;s different</a>
          <a href="#how">How it works</a>
        </nav>

        <a className="nav__cta" href="#waitlist" onClick={() => track.ctaClicked('nav')}>
          Join waitlist
        </a>
      </div>
    </header>
  )
}
