import { Link } from 'react-router-dom'
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'
import Navbar from './Navbar'
import CartIcon from '../cart/CartIcon'
import Button from '../common/Button'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBagIcon className="w-8 h-8 text-primary-600" />
            <span className="text-xl md:text-2xl font-bold text-neutral-900">E-Commerce</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Inicio
            </Link>
            <Link to="/products" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Productos
            </Link>
            <CartIcon />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-neutral-200">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700">
                    {user?.name}
                  </span>
                </div>
                {user?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-4 border-l border-neutral-200">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
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

