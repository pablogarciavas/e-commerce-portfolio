import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import PageTransition from '../PageTransition'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <Navbar />
      <main className="flex-grow">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default Layout

