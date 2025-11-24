export const filterProducts = (products, filters) => {
  let filtered = [...products]

  if (filters.search && filters.search.trim() !== '') {
    const searchTerm = filters.search.toLowerCase().trim()
    filtered = filtered.filter(product => {
      const titleMatch = product.title?.toLowerCase().includes(searchTerm)
      const descriptionMatch = product.description?.toLowerCase().includes(searchTerm)
      const categoryMatch = product.category?.toLowerCase().includes(searchTerm)
      return titleMatch || descriptionMatch || categoryMatch
    })
  }

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => 
      product.category?.toLowerCase() === filters.category.toLowerCase()
    )
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    filtered = filtered.filter(product => product.price >= filters.minPrice)
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice)
  }

  if (filters.minRating !== null && filters.minRating !== undefined) {
    filtered = filtered.filter(product => 
      (product.rating?.rate || 0) >= filters.minRating
    )
  }

  if (filters.inStock !== null && filters.inStock !== undefined) {
    if (filters.inStock) {
      filtered = filtered.filter(product => {
        if (product.stock !== undefined) {
          return product.stock > 0
        }
        return true
      })
    }
  }

  return filtered
}

export const getPriceRange = (products) => {
  if (!products || products.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = products.map(product => product.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

export const clearFilters = () => {
  return {
    search: '',
    category: 'all',
    minPrice: null,
    maxPrice: null,
    minRating: null,
    inStock: null
  }
}

