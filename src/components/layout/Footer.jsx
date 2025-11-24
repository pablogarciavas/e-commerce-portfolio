import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">E-Commerce</h3>
            <p className="text-neutral-400 text-sm">
              Tu tienda online de confianza. Productos de calidad al mejor precio.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <p className="text-neutral-400 text-sm">
              Email: info@ecommerce.com
            </p>
            <p className="text-neutral-400 text-sm">
              Teléfono: +34 123 456 789
            </p>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} E-Commerce Portfolio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

