import { useProducts } from '../context/ProductContext'
import ProductList from '../components/product/ProductList'
import Loading from '../components/common/Loading'

function Products() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <Loading fullScreen />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Error al cargar los productos
          </h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Productos
        </h1>
        <p className="text-neutral-600">
          {products.length} {products.length === 1 ? 'producto disponible' : 'productos disponibles'}
        </p>
      </div>
      
      <ProductList products={products} />
    </div>
  )
}

export default Products
