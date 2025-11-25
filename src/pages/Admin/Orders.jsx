import { useState } from 'react'
import { getFromStorage } from '../../utils/storage'
import { formatPrice, formatDateShort } from '../../utils/formatters'
import Card from '../../components/common/Card'

function Orders() {
  const orders = getFromStorage('orders', [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completado'
      case 'pending':
        return 'Pendiente'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  if (orders.length === 0) {
    return (
      <div className="container-custom section-padding">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Gestión de Pedidos
          </h1>
          <p className="text-neutral-600">
            Historial de pedidos realizados
          </p>
        </div>

        <Card className="text-center py-12">
          <p className="text-neutral-600 mb-2">
            No hay pedidos registrados aún
          </p>
          <p className="text-sm text-neutral-500">
            Los pedidos aparecerán aquí una vez que los clientes completen sus compras
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Gestión de Pedidos
        </h1>
        <p className="text-neutral-600">
          {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} en total
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Pedido #{order.id.slice(0, 8)}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
                  <div>
                    <p className="font-medium text-neutral-700 mb-1">Cliente</p>
                    <p>{order.userName || 'Usuario'}</p>
                    <p className="text-xs text-neutral-500">{order.userEmail}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-neutral-700 mb-1">Fecha</p>
                    <p>{formatDateShort(order.createdAt)}</p>
                  </div>
                  
                  {order.shippingAddress && (
                    <div>
                      <p className="font-medium text-neutral-700 mb-1">Dirección de envío</p>
                      <p className="text-xs">
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <p className="font-medium text-neutral-700 mb-1">Total</p>
                    <p className="text-lg font-bold text-primary-600">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-neutral-700 mb-2">
                    Productos ({order.items?.length || 0}):
                  </p>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded bg-neutral-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-neutral-900">{item.title}</p>
                          <p className="text-neutral-600">
                            {item.quantity} x {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="font-medium text-neutral-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Orders
