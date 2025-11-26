import { useEffect } from 'react'

export const ProductStructuredData = ({ product }) => {
  useEffect(() => {
    if (!product || typeof window === 'undefined') return

    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.title,
      "image": product.image,
      "description": product.description,
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "EUR",
        "price": product.price,
        "availability": product.stock > 0 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock"
      }
    }

    if (product.rating) {
      structuredData.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": product.rating.rate,
        "reviewCount": product.rating.count
      }
    }

    let script = document.querySelector('script[type="application/ld+json"][data-product]')
    if (!script) {
      script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-product', 'true')
      document.head.appendChild(script)
    }
    
    script.textContent = JSON.stringify(structuredData)

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-product]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [product])

  return null
}

export const WebsiteStructuredData = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "E-Commerce Portfolio",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/products?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }

    let script = document.querySelector('script[type="application/ld+json"][data-website]')
    if (!script) {
      script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-website', 'true')
      document.head.appendChild(script)
    }
    
    script.textContent = JSON.stringify(structuredData)
  }, [])

  return null
}

