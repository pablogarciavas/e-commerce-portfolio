const API_BASE_URL = 'https://fakestoreapi.com'

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('Error al cargar los productos')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error('Error al cargar el producto')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
    if (!response.ok) {
      throw new Error('Error al cargar los productos por categoría')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error('Error al cargar las categorías')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

