function Card({ children, className = '', hover = true, padding = true }) {
  const baseStyles = 'card bg-white rounded-xl shadow-soft transition-shadow duration-300'
  const hoverStyles = hover ? 'hover:shadow-medium' : ''
  const paddingStyles = padding ? 'p-6' : ''
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}>
      {children}
    </div>
  )
}

export default Card

