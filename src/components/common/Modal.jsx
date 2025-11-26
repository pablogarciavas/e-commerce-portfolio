import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set([overlayRef.current, modalRef.current], { opacity: 1, scale: 1 })
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: 'power2.out' }
    )
    .fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' },
      '-=0.1'
    )

    return () => {
      tl.kill()
    }
  }, [isOpen])

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
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
          aria-hidden="true"
        />
        <div 
          ref={modalRef} 
          className={`relative bg-white rounded-xl shadow-large ${sizes[size]} w-full`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h3 id="modal-title" className="text-xl font-semibold text-neutral-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
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

