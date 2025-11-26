import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

function PageTransition({ children }) {
  const location = useLocation()
  const contentRef = useRef(null)

  useEffect(() => {
    if (!contentRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }
    )
  }, [location.pathname])

  return (
    <div ref={contentRef}>
      {children}
    </div>
  )
}

export default PageTransition

