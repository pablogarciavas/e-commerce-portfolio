import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
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

  const saveCart = useCallback((cartItems) => {
    setItems(cartItems)
    saveToStorage('cart', cartItems)
  }, [])

  const addToCart = useCallback((product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        saveToStorage('cart', updatedItems)
        return updatedItems
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity
        }
        const updatedItems = [...prevItems, newItem]
        saveToStorage('cart', updatedItems)
        return updatedItems
      }
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId)
      saveToStorage('cart', updatedItems)
      return updatedItems
    })
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      saveToStorage('cart', updatedItems)
      return updatedItems
    })
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
    saveToStorage('cart', [])
  }, [])

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  const getItemQuantity = useCallback((productId) => {
    const item = items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }, [items])

  const isInCart = useCallback((productId) => {
    return items.some(item => item.id === productId)
  }, [items])

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    getItemQuantity,
    isInCart
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount, getItemQuantity, isInCart])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

