import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatters'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'
import Card from '../components/common/Card'
import LazyImage from '../components/common/LazyImage'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, loading } = useProducts()
  const { addToCart, isInCart, getItemQuantity } = useCart()
  
  const product = getProductById(id)
  const inCart = product ? isInCart(product.id) : false
  const quantityInCart = product ? getItemQuantity(product.id) : 0

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1)
    }
  }

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <Loading fullScreen />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Producto no encontrado
          </h2>
          <p className="text-neutral-600 mb-6">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Button onClick={() => navigate('/products')}>
            Volver a productos
          </Button>
        </div>
      </div>
    )
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarIcon key="half" className="w-5 h-5 text-yellow-400" />
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutlineIcon key={`empty-${i}`} className="w-5 h-5 text-neutral-300" />
      )
    }
    
    return stars
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Volver a productos
        </Link>
        
        <nav className="flex items-center space-x-2 text-sm text-neutral-600">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600 transition-colors">
            Productos
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <span className="capitalize">{product.category}</span>
            </>
          )}
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
          <LazyImage
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            {product.category && (
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4 capitalize">
                {product.category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating?.rate || 0)}
              </div>
              <span className="text-neutral-600">
                {product.rating?.rate?.toFixed(1) || '0.0'} ({product.rating?.count || 0} reseñas)
              </span>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Descripción
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {product.description}
            </p>
          </Card>

          <div className="mt-auto space-y-4">
            {inCart ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-700 font-medium text-center">
                  ✓ {quantityInCart} {quantityInCart === 1 ? 'unidad' : 'unidades'} en el carrito
                </p>
              </div>
            ) : null}
            
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
            >
              {inCart ? 'Agregar otra unidad' : 'Agregar al carrito'}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => navigate('/cart')}
            >
              Ver carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
