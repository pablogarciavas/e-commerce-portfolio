import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  const subtotal = item.price * item.quantity

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-200">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
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
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 min-w-[3rem] text-center font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-neutral-100 transition-colors"
            aria-label="Increase quantity"
          >
            <PlusIcon className="w-4 h-4" />
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
          aria-label="Remove item"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default CartItem

