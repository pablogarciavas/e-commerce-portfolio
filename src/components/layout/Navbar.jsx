import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'
import CartIcon from '../cart/CartIcon'
import Button from '../common/Button'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  
  const isActive = (path) => location.pathname === path
  
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>
      
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div className="bg-white w-64 h-full shadow-large" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-neutral-900">Menú</span>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-6 h-6 text-neutral-700" />
                </button>
              </div>
              
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center justify-between py-2 px-4">
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className={`flex-grow transition-colors ${
                      isActive('/cart')
                        ? 'bg-primary-100 text-primary-700 font-medium rounded-lg py-2 px-4 -mx-4'
                        : 'text-neutral-700 hover:bg-neutral-100 rounded-lg py-2 px-4 -mx-4'
                    }`}
                  >
                    Carrito
                  </Link>
                  <div onClick={() => setIsOpen(false)}>
                    <CartIcon />
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-4 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 py-2 px-4 mb-4">
                        <UserCircleIcon className="w-6 h-6 text-neutral-600" />
                        <span className="text-neutral-700 font-medium">{user?.name}</span>
                      </div>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className={`block py-2 px-4 rounded-lg transition-colors ${
                            isActive('/admin')
                              ? 'bg-primary-100 text-primary-700 font-medium'
                              : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          Panel Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 px-4 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
                      >
                        Salir
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors mb-2"
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors text-center"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar

