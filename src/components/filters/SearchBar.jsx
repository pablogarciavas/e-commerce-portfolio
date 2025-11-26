import { useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

function SearchBar({ onSearch, placeholder = 'Buscar productos...' }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="relative w-full">
      <label htmlFor="search-input" className="sr-only">
        Buscar productos
      </label>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
      </div>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="input pl-12 pr-10 w-full"
        aria-label="Buscar productos"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default SearchBar

