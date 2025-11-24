import { createContext, useContext, useState, useEffect } from 'react'
import { saveToStorage, getFromStorage } from '../utils/storage'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const savedCart = getFromStorage('cart', [])
    setItems(savedCart)
  }, [])

  const saveCart = (cartItems) => {
    setItems(cartItems)
    saveToStorage('cart', cartItems)
  }

  const addToCart = (product, quantity = 1) => {
    const existingItemIndex = items.findIndex(item => item.id === product.id)

    if (existingItemIndex >= 0) {
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += quantity
      saveCart(updatedItems)
    } else {
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      }
      saveCart([...items, newItem])
    }
  }

  const removeFromCart = (productId) => {
    const updatedItems = items.filter(item => item.id !== productId)
    saveCart(updatedItems)
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const updatedItems = items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
    saveCart(updatedItems)
  }

  const clearCart = () => {
    saveCart([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const isInCart = (productId) => {
    return items.some(item => item.id === productId)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    getItemQuantity,
    isInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

