import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const useGSAP = (callback, dependencies = []) => {
  const scope = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      if (callback) {
        callback(scope.current)
      }
    }, scope)

    return () => {
      context.revert()
    }
  }, dependencies)

  return scope
}

export default useGSAP

