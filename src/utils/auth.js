import { validateEmail, validatePassword } from './validators'
import { saveToStorage, getFromStorage } from './storage'

const USERS_STORAGE_KEY = 'users'
const CURRENT_USER_STORAGE_KEY = 'currentUser'

export const hashPassword = (password) => {
  return btoa(password)
}

export const verifyPassword = (password, hashedPassword) => {
  return btoa(password) === hashedPassword
}

export const registerUser = (userData) => {
  const { email, password, name } = userData

  if (!validateEmail(email)) {
    throw new Error('Email no válido')
  }

  if (!validatePassword(password)) {
    throw new Error('La contraseña debe tener al menos 6 caracteres')
  }

  if (!name || name.trim().length < 2) {
    throw new Error('El nombre debe tener al menos 2 caracteres')
  }

  const users = getFromStorage(USERS_STORAGE_KEY, [])
  
  const existingUser = users.find(user => user.email === email)
  if (existingUser) {
    throw new Error('Este email ya está registrado')
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashPassword(password),
    name: name.trim(),
    role: 'customer',
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveToStorage(USERS_STORAGE_KEY, users)

  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export const loginUser = (email, password) => {
  if (!validateEmail(email)) {
    throw new Error('Email no válido')
  }

  if (!password) {
    throw new Error('La contraseña es requerida')
  }

  const users = getFromStorage(USERS_STORAGE_KEY, [])
  const user = users.find(u => u.email === email)

  if (!user) {
    throw new Error('Email o contraseña incorrectos')
  }

  if (!verifyPassword(password, user.password)) {
    throw new Error('Email o contraseña incorrectos')
  }

  const { password: _, ...userWithoutPassword } = user
  saveToStorage(CURRENT_USER_STORAGE_KEY, userWithoutPassword)

  return userWithoutPassword
}

export const logoutUser = () => {
  saveToStorage(CURRENT_USER_STORAGE_KEY, null)
}

export const getCurrentUser = () => {
  return getFromStorage(CURRENT_USER_STORAGE_KEY, null)
}

export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

export const isAdmin = () => {
  const user = getCurrentUser()
  return user && user.role === 'admin'
}

