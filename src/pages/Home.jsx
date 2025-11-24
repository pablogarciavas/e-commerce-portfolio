import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

function Home() {
  return (
    <div className="container-custom section-padding">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
          Bienvenido a nuestra tienda
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-8">
          Descubre nuestra amplia selección de productos de calidad al mejor precio
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" variant="primary">
              Ver Productos
            </Button>
          </Link>
          <Link to="/products">
            <Button size="lg" variant="outline">
              Explorar Catálogo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

