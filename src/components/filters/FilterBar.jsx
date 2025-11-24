import { useState } from 'react'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

function FilterBar({ categories, onFilterChange, filters, priceRange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category })
  }

  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? null : parseFloat(value)
    onFilterChange({
      ...filters,
      [type]: numValue
    })
  }

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? null : rating
    })
  }

  const handleStockChange = (inStock) => {
    onFilterChange({
      ...filters,
      inStock: filters.inStock === inStock ? null : inStock
    })
  }

  const clearFilters = () => {
    onFilterChange({
      search: filters.search || '',
      category: 'all',
      minPrice: null,
      maxPrice: null,
      minRating: null,
      inStock: null
    })
  }

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minRating !== null ||
    filters.inStock !== null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
        >
          <FunnelIcon className="w-5 h-5" />
          Filtros
          {hasActiveFilters && (
            <span className="bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {isOpen && (
        <div className="bg-white rounded-xl shadow-soft p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Categoría
            </label>
            <select
              value={filters.category || 'all'}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input w-full"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Rango de Precio
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  min={priceRange?.min || 0}
                  max={priceRange?.max || 1000}
                  className="input"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Máximo"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  min={priceRange?.min || 0}
                  max={priceRange?.max || 1000}
                  className="input"
                />
              </div>
            </div>
            {priceRange && (
              <p className="text-xs text-neutral-500 mt-2">
                Rango: {priceRange.min.toFixed(2)}€ - {priceRange.max.toFixed(2)}€
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Valoración Mínima
            </label>
            <div className="flex gap-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-colors ${
                    filters.minRating === rating
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <StarIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Disponibilidad
            </label>
            <button
              onClick={() => handleStockChange(true)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                filters.inStock === true
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 hover:border-primary-300'
              }`}
            >
              En stock
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar

