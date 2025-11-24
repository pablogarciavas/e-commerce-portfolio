import { Link } from 'react-router-dom'
import Card from '../common/Card'
import { formatPrice } from '../../utils/formatters'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'

function ProductCard({ product }) {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarIcon key="half" className="w-4 h-4 text-yellow-400" />
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutlineIcon key={`empty-${i}`} className="w-4 h-4 text-neutral-300" />
      )
    }
    
    return stars
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full flex flex-col group cursor-pointer">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
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
      </Card>
    </Link>
  )
}

export default ProductCard

