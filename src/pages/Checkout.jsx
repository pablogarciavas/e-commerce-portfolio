import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatters'
import { saveToStorage } from '../utils/storage'
import PaymentForm from '../components/checkout/PaymentForm'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'

function Checkout() {
  const { items, getTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingData, setShippingData] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  })
  const [shippingErrors, setShippingErrors] = useState({})

  const subtotal = getTotal()
  const tax = subtotal * 0.21
  const total = subtotal + tax

  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingData(prev => ({
      ...prev,
      [name]: value
    }))
    if (shippingErrors[name]) {
      setShippingErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateShipping = () => {
    const newErrors = {}

    if (!shippingData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido'
    }

    if (!shippingData.address.trim()) {
      newErrors.address = 'La dirección es requerida'
    }

    if (!shippingData.city.trim()) {
      newErrors.city = 'La ciudad es requerida'
    }

    if (!shippingData.postalCode.trim()) {
      newErrors.postalCode = 'El código postal es requerido'
    }

    if (!shippingData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    }

    setShippingErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    if (validateShipping()) {
      setStep(2)
    }
  }

  const handlePaymentSubmit = async (paymentData) => {
    setIsProcessing(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const order = {
      id: `order-${Date.now()}`,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      tax,
      total,
      shippingAddress: shippingData,
      paymentMethod: 'Tarjeta de crédito',
      status: 'completed',
      createdAt: new Date().toISOString()
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    saveToStorage('orders', orders)

    clearCart()
    setIsProcessing(false)
    navigate(`/order-confirmation/${order.id}`)
  }

  if (items.length === 0) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-neutral-600 mb-6">
            Agrega productos al carrito antes de proceder al checkout
          </p>
          <Button onClick={() => navigate('/products')}>
            Ver Productos
          </Button>
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="container-custom section-padding">
        <Loading fullScreen />
        <div className="text-center mt-8">
          <p className="text-lg text-neutral-700">
            Procesando tu pedido...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Checkout
        </h1>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200'}`}>
            1. Envío
          </span>
          <span>→</span>
          <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200'}`}>
            2. Pago
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 ? (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Información de Envío
              </h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <Input
                  label="Nombre Completo"
                  name="fullName"
                  value={shippingData.fullName}
                  onChange={handleShippingChange}
                  placeholder="Juan Pérez"
                  error={shippingErrors.fullName}
                  required
                />

                <Input
                  label="Dirección"
                  name="address"
                  value={shippingData.address}
                  onChange={handleShippingChange}
                  placeholder="Calle Principal 123"
                  error={shippingErrors.address}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ciudad"
                    name="city"
                    value={shippingData.city}
                    onChange={handleShippingChange}
                    placeholder="Madrid"
                    error={shippingErrors.city}
                    required
                  />

                  <Input
                    label="Código Postal"
                    name="postalCode"
                    value={shippingData.postalCode}
                    onChange={handleShippingChange}
                    placeholder="28001"
                    error={shippingErrors.postalCode}
                    required
                  />
                </div>

                <Input
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  value={shippingData.phone}
                  onChange={handleShippingChange}
                  placeholder="+34 123 456 789"
                  error={shippingErrors.phone}
                  required
                />

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Continuar al Pago
                </Button>
              </form>
            </Card>
          ) : (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Información de Pago
              </h2>
              <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
              <Button
                variant="ghost"
                fullWidth
                className="mt-4"
                onClick={() => setStep(1)}
              >
                ← Volver a Envío
              </Button>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-600">
                <span>IVA (21%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Checkout
