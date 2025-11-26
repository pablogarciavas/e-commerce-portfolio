import { memo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import LazyImage from '../common/LazyImage'
import { formatPrice } from '../../utils/formatters'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const itemRef = useRef(null)

  useEffect(() => {
    if (itemRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (!prefersReducedMotion) {
        gsap.fromTo(
          itemRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
          }
        )
      }
    }
  }, [])

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion && itemRef.current) {
      gsap.to(itemRef.current, {
        opacity: 0,
        x: 20,
        height: 0,
        marginBottom: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          removeFromCart(item.id)
        }
      })
    } else {
      removeFromCart(item.id)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <div ref={itemRef} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-200">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        <LazyImage
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
          width={80}
          height={80}
        />
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-neutral-900 mb-1 truncate">
          {item.title}
        </h3>
        <p className="text-lg font-bold text-primary-600">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-neutral-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="px-3 py-1 min-w-[3rem] text-center font-medium" aria-label={`Quantity: ${item.quantity}`}>
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-neutral-100 transition-colors"
            aria-label="Increase quantity"
          >
            <PlusIcon className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="text-right min-w-[6rem]">
          <p className="text-lg font-bold text-neutral-900">
            {formatPrice(subtotal)}
          </p>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={`Remove ${item.title} from cart`}
        >
          <TrashIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default memo(CartItem)

