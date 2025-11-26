import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ProductCard from './ProductCard'

function ProductList({ products }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!products || products.length === 0) return

    const cards = containerRef.current?.querySelectorAll('article')
    if (!cards || cards.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      }
    )
  }, [products])

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 text-lg">No se encontraron productos</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList

