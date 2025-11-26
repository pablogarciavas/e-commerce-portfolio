import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Button from '../components/common/Button'
import { MetaTags } from '../components/SEO/MetaTags'

function Home() {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, textRef.current, buttonsRef.current], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline()

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }

    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.3'
      )
    }
  }, [])

  return (
    <>
      <MetaTags
        title="Inicio"
        description="Bienvenido a nuestra tienda online. Descubre nuestra amplia selección de productos de calidad al mejor precio."
      />
      <div className="container-custom section-padding">
      <div className="text-center max-w-3xl mx-auto">
        <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
          Bienvenido a nuestra tienda
        </h1>
        <p ref={textRef} className="text-lg md:text-xl text-neutral-600 mb-8">
          Descubre nuestra amplia selección de productos de calidad al mejor precio
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" variant="primary">
              Ver Productos
            </Button>
          </Link>
          <Link to="/products">
            <Button size="lg" variant="outline">
              Explorar Catálogo
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home

