import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

function CartIcon() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <Link to="/cart" className="relative text-neutral-700 hover:text-primary-600 transition-colors">
      <ShoppingBagIcon className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}

export default CartIcon

