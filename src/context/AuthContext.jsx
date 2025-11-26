import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../utils/auth'
import { getFromStorage, saveToStorage } from '../utils/storage'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const createDefaultAdmin = () => {
  const users = getFromStorage('users', [])
  const adminExists = users.some(u => u.role === 'admin')
  
  if (!adminExists) {
    const adminUser = {
      id: 'admin-001',
      email: 'admin@ecommerce.com',
      password: btoa('admin123'),
      name: 'Administrador',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
    users.push(adminUser)
    saveToStorage('users', users)
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    createDefaultAdmin()
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const userData = loginUser(email, password)
      setUser(userData)
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      const newUser = registerUser(userData)
      setUser(newUser)
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const isAuthenticated = useMemo(() => user !== null, [user])
  const isAdmin = useMemo(() => user && user.role === 'admin', [user])

  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin
  }), [user, isLoading, login, register, logout, isAuthenticated, isAdmin])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

