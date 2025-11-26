import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

function CartIcon() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()
  const badgeRef = useRef(null)
  const prevCountRef = useRef(itemCount)

  useEffect(() => {
    if (itemCount > prevCountRef.current && badgeRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (!prefersReducedMotion) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
          }
        )
      }
    }
    prevCountRef.current = itemCount
  }, [itemCount])

  return (
    <Link 
      to="/cart" 
      className="relative text-neutral-700 hover:text-primary-600 transition-colors"
      aria-label={`Carrito de compras${itemCount > 0 ? ` con ${itemCount} ${itemCount === 1 ? 'artículo' : 'artículos'}` : ' vacío'}`}
    >
      <ShoppingBagIcon className="w-6 h-6" aria-hidden="true" />
      {itemCount > 0 && (
        <span
          ref={badgeRef}
          className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          aria-label={`${itemCount} ${itemCount === 1 ? 'artículo' : 'artículos'} en el carrito`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}

export default CartIcon

