import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getAllProducts, getProduct, getProductsByCategory, getCategories } from '../utils/api'
import { saveToStorage, getFromStorage } from '../utils/storage'

const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const cachedProducts = getFromStorage('products', [])
      const cachedCategories = getFromStorage('categories', [])
      
      if (cachedProducts.length > 0 && cachedCategories.length > 0) {
        setProducts(cachedProducts)
        setCategories(cachedCategories)
        setLoading(false)
      }
      
      const [apiProducts, apiCategories] = await Promise.all([
        getAllProducts(),
        getCategories()
      ])
      
      const localProducts = getFromStorage('localProducts', [])
      const allProducts = [...apiProducts, ...localProducts]
      
      setProducts(allProducts)
      setCategories(apiCategories)
      
      saveToStorage('products', allProducts)
      saveToStorage('categories', apiCategories)
      
      setLoading(false)
    } catch (err) {
      console.error('Error loading products:', err)
      setError(err.message)
      setLoading(false)
      
      const cachedProducts = getFromStorage('products', [])
      const cachedCategories = getFromStorage('categories', [])
      if (cachedProducts.length > 0) {
        setProducts(cachedProducts)
        setCategories(cachedCategories)
      }
    }
  }

  const getProductById = (id) => {
    return products.find(product => product.id === id || product.id === parseInt(id))
  }

  const getProductsByCategoryName = (categoryName) => {
    if (!categoryName || categoryName === 'all') {
      return products
    }
    return products.filter(product => 
      product.category?.toLowerCase() === categoryName.toLowerCase()
    )
  }

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    
    const localProducts = getFromStorage('localProducts', [])
    const updatedLocalProducts = [...localProducts, newProduct]
    saveToStorage('localProducts', updatedLocalProducts)
    
    const allProducts = [...products, newProduct]
    setProducts(allProducts)
    saveToStorage('products', allProducts)
    
    return newProduct
  }

  const updateProduct = (id, updatedProduct) => {
    const localProducts = getFromStorage('localProducts', [])
    const productIndex = localProducts.findIndex(p => p.id === id || p.id === parseInt(id))
    
    if (productIndex !== -1) {
      localProducts[productIndex] = {
        ...localProducts[productIndex],
        ...updatedProduct,
        updatedAt: new Date().toISOString()
      }
      saveToStorage('localProducts', localProducts)
    }
    
    const allProducts = products.map(product => {
      if (product.id === id || product.id === parseInt(id)) {
        return {
          ...product,
          ...updatedProduct,
          updatedAt: new Date().toISOString()
        }
      }
      return product
    })
    
    setProducts(allProducts)
    saveToStorage('products', allProducts)
  }

  const deleteProduct = (id) => {
    const localProducts = getFromStorage('localProducts', [])
    const filteredLocalProducts = localProducts.filter(p => p.id !== id && p.id !== parseInt(id))
    saveToStorage('localProducts', filteredLocalProducts)
    
    const allProducts = products.filter(product => product.id !== id && product.id !== parseInt(id))
    setProducts(allProducts)
    saveToStorage('products', allProducts)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const value = useMemo(() => ({
    products,
    categories,
    loading,
    error,
    loadProducts,
    getProductById,
    getProductsByCategoryName,
    addProduct,
    updateProduct,
    deleteProduct
  }), [products, categories, loading, error])

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

