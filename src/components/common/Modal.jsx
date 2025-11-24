import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        <div className={`relative bg-white rounded-xl shadow-large ${sizes[size]} w-full animate-scale-in`}>
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

