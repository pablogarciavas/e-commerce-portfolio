import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/common/Button'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

function Cart() {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-16">
          <ShoppingBagIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-neutral-600 mb-8">
            Agrega algunos productos para comenzar
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Ver Productos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Carrito de Compras
        </h1>
        <p className="text-neutral-600">
          {items.length} {items.length === 1 ? 'artículo en tu carrito' : 'artículos en tu carrito'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              Productos
            </h2>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Vaciar carrito
              </button>
            )}
          </div>

          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default Cart
