import { useState, useMemo } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductList from '../components/product/ProductList'
import SearchBar from '../components/filters/SearchBar'
import FilterBar from '../components/filters/FilterBar'
import Loading from '../components/common/Loading'
import { filterProducts, getPriceRange } from '../utils/filters'

function Products() {
  const { products, categories, loading, error } = useProducts()
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    minPrice: null,
    maxPrice: null,
    minRating: null,
    inStock: null
  })

  const priceRange = useMemo(() => getPriceRange(products), [products])

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters)
  }, [products, filters])

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

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
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          {filteredProducts.length !== products.length && (
            <span className="text-neutral-500">
              {' '}de {products.length} disponibles
            </span>
          )}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <FilterBar
        categories={categories}
        onFilterChange={handleFilterChange}
        filters={filters}
        priceRange={priceRange}
      />
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg mb-4">
            No se encontraron productos con los filtros seleccionados
          </p>
          <button
            onClick={() => setFilters({
              search: '',
              category: 'all',
              minPrice: null,
              maxPrice: null,
              minRating: null,
              inStock: null
            })}
            className="btn btn-outline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  )
}

export default Products
