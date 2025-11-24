import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import Button from '../common/Button'
import Card from '../common/Card'

function CartSummary() {
  const { getTotal, items } = useCart()
  const subtotal = getTotal()
  const tax = subtotal * 0.21
  const total = subtotal + tax

  return (
    <Card className="sticky top-24">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">
        Resumen del Pedido
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-neutral-700">
          <span>Subtotal ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-neutral-700">
          <span>IVA (21%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between text-lg font-bold text-neutral-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="block">
        <Button variant="primary" size="lg" fullWidth disabled={items.length === 0}>
          Proceder al Checkout
        </Button>
      </Link>

      <Link to="/products" className="block mt-4">
        <Button variant="outline" size="lg" fullWidth>
          Continuar Comprando
        </Button>
      </Link>
    </Card>
  )
}

export default CartSummary

