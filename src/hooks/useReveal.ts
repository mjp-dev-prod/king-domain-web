import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Scroll-triggered staggered reveal for any descendants marked `.reveal`.
 * Respects prefers-reduced-motion — reduced users get the content immediately.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null)

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('.reveal')
      if (!targets.length) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      targets.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            // Reversible rather than `once` so a trigger that resolves before
            // fonts/layout settle still recovers on refresh instead of
            // leaving the element stuck at opacity 0.
            toggleActions: 'play none none none',
          },
        })
      })

      // Web fonts and the SSG hydration pass both shift layout after the
      // triggers are first measured. Recalculate once things have settled.
      const refresh = () => ScrollTrigger.refresh()
      if (document.fonts?.status === 'loaded') {
        refresh()
      } else {
        document.fonts?.ready.then(refresh)
      }
      window.addEventListener('load', refresh)

      return () => window.removeEventListener('load', refresh)
    },
    { scope },
  )

  return scope
}
