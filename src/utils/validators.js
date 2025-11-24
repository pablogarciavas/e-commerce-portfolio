export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export const validatePrice = (price) => {
  const numPrice = parseFloat(price)
  return !isNaN(numPrice) && numPrice > 0
}

export const validateQuantity = (quantity) => {
  const numQuantity = parseInt(quantity)
  return !isNaN(numQuantity) && numQuantity > 0 && Number.isInteger(numQuantity)
}

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '')
  return /^\d{13,19}$/.test(cleaned)
}

export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv)
}

export const validateExpiryDate = (expiryDate) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!regex.test(expiryDate)) {
    return false
  }
  
  const [month, year] = expiryDate.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1
  
  const expiryYear = parseInt(year)
  const expiryMonth = parseInt(month)
  
  if (expiryYear < currentYear) {
    return false
  }
  
  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return false
  }
  
  return true
}

