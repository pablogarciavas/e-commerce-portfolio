import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Navbar from './Navbar'
import CartIcon from '../cart/CartIcon'

function Header() {
  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBagIcon className="w-8 h-8 text-primary-600" />
            <span className="text-xl md:text-2xl font-bold text-neutral-900">E-Commerce</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Inicio
            </Link>
            <Link to="/products" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Productos
            </Link>
            <CartIcon />
          </nav>
          
          <div className="md:hidden">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

