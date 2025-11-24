import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout

