import { memo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import Card from '../common/Card'
import LazyImage from '../common/LazyImage'
import { formatPrice } from '../../utils/formatters'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart()
  const inCart = isInCart(product.id)
  const buttonRef = useRef(null)
  const cardRef = useRef(null)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion && buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    addToCart(product, 1)
  }
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="w-4 h-4 text-yellow-400" aria-hidden="true" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarIcon key="half" className="w-4 h-4 text-yellow-400" aria-hidden="true" />
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutlineIcon key={`empty-${i}`} className="w-4 h-4 text-neutral-300" aria-hidden="true" />
      )
    }
    
    return stars
  }

  return (
    <article className="h-full flex flex-col group cursor-pointer relative">
      <Card ref={cardRef} className="h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-grow flex flex-col" aria-label={`Ver detalles de ${product.title}`}>
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100 mb-4">
          <LazyImage
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={400}
          />
        </div>
        
        <div className="flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1 mb-2" role="img" aria-label={`Rating: ${product.rating?.rate || 0} de 5 estrellas`}>
            {renderStars(product.rating?.rate || 0)}
            <span className="text-sm text-neutral-600 ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>
          
          <div className="mt-auto">
            <p className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </p>
            {product.category && (
              <p className="text-sm text-neutral-500 mt-1 capitalize">
                {product.category}
              </p>
            )}
          </div>
        </div>
      </Link>
      
      <button
        ref={buttonRef}
        onClick={handleAddToCart}
        aria-label={inCart ? `${product.title} ya está en el carrito` : `Agregar ${product.title} al carrito`}
        className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
          inCart
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        <ShoppingCartIcon className="w-5 h-5" aria-hidden="true" />
        {inCart ? 'En el carrito' : 'Agregar al carrito'}
      </button>
      </Card>
    </article>
  )
}

export default memo(ProductCard)

