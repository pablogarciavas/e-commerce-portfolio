import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
  ]
  
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
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-4 rounded-lg transition-colors ${
                    isActive('/cart')
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  Carrito
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar

