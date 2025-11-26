import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Loading from './components/common/Loading'

const Home = lazy(() => import('./pages/Home.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard.jsx'))
const ProductManagement = lazy(() => import('./pages/Admin/ProductManagement.jsx'))
const Orders = lazy(() => import('./pages/Admin/Orders.jsx'))

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Suspense fallback={<Loading fullScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-confirmation/:id"
                    element={
                      <ProtectedRoute>
                        <OrderConfirmation />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRoute>
                        <ProductManagement />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <Orders />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App

