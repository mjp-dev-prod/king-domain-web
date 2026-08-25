import { track } from '../lib/analytics'
import './footer.scss'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <p className="footer__note">
            A working draft of something we think should exist. Built in public.
          </p>
          <a className="footer__link" href="#waitlist" onClick={() => track.ctaClicked('footer')}>
            Join the waitlist
          </a>
        </div>

        <p className="footer__wordmark" aria-hidden="true">
          KING DOMAIN
        </p>

        <div className="footer__base">
          <span>&copy; {new Date().getFullYear()} King Domain</span>
          <span>Working draft — nothing here is a final commitment.</span>
        </div>
      </div>
    </footer>
  )
}
