import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import PageTransition from '../PageTransition'
import { WebsiteStructuredData } from '../SEO/StructuredData'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <WebsiteStructuredData />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <Navbar />
      <main id="main-content" className="flex-grow" role="main">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default Layout

