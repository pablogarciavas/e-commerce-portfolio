import { forwardRef } from 'react'

const Card = forwardRef(function Card({ children, className = '', hover = true, padding = true }, ref) {
  const baseStyles = 'card bg-white rounded-xl shadow-soft transition-shadow duration-300'
  const hoverStyles = hover ? 'hover:shadow-medium' : ''
  const paddingStyles = padding ? 'p-6' : ''
  
  return (
    <div ref={ref} className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}>
      {children}
    </div>
  )
})

export default Card

