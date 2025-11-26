import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { getFromStorage } from '../utils/storage'
import { formatPrice, formatDateShort } from '../utils/formatters'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

function OrderConfirmation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const orders = getFromStorage('orders', [])
  const order = orders.find(o => o.id === id)
  const iconRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!order) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      const tl = gsap.timeline()

      if (iconRef.current) {
        tl.fromTo(
          iconRef.current,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
          }
        )
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          },
          '-=0.3'
        )
      }
    }
  }, [order])

  if (!order) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Pedido no encontrado
          </h2>
          <p className="text-neutral-600 mb-6">
            El pedido que buscas no existe.
          </p>
          <Button onClick={() => navigate('/products')}>
            Volver a Productos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div ref={iconRef} className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircleIcon className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-neutral-600">
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>
        </div>

        <Card ref={contentRef} className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                Pedido #{order.id.slice(0, 8)}
              </h2>
              <p className="text-sm text-neutral-600">
                Realizado el {formatDateShort(order.createdAt)}
              </p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Completado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-neutral-200">
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">
                Dirección de Envío
              </h3>
              <p className="text-neutral-900">{order.shippingAddress?.fullName}</p>
              <p className="text-neutral-600 text-sm">
                {order.shippingAddress?.address}
              </p>
              <p className="text-neutral-600 text-sm">
                {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
              </p>
              <p className="text-neutral-600 text-sm">
                {order.shippingAddress?.phone}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">
                Método de Pago
              </h3>
              <p className="text-neutral-900">{order.paymentMethod}</p>
              <p className="text-neutral-600 text-sm mt-2">
                Email: {order.userEmail}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-700 mb-4">
              Productos ({order.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded bg-neutral-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-neutral-900">{item.title}</p>
                    <p className="text-sm text-neutral-600">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4">
            <div className="flex justify-between text-sm text-neutral-600 mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-600 mb-2">
              <span>IVA (21%)</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/products" className="flex-1">
            <Button variant="primary" fullWidth>
              Continuar Comprando
            </Button>
          </Link>
          <Link to="/admin/orders" className="flex-1">
            <Button variant="outline" fullWidth>
              Ver Todos los Pedidos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation

