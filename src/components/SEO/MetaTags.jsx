import { useEffect } from 'react'

export const MetaTags = ({ title, description, image, url, type = 'website' }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const baseTitle = 'E-Commerce Portfolio'
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle
    
    document.title = fullTitle
    
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return
      
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }
    
    const currentUrl = url || window.location.href
    
    updateMetaTag('description', description)
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl)
  }, [title, description, image, url, type])
  
  return null
}

