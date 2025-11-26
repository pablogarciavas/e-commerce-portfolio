import { Link } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'
import { useCart } from '../../context/CartContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { ShoppingBagIcon, CubeIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline'

function Dashboard() {
  const { products } = useProducts()
  const { items } = useCart()

  const stats = [
    {
      name: 'Total Productos',
      value: products.length,
      icon: CubeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Productos Locales',
      value: products.filter(p => !p.rating).length,
      icon: ShoppingBagIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Categorías',
      value: new Set(products.map(p => p.category)).size,
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Items en Carritos',
      value: items.length,
      icon: UserGroupIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="container-custom section-padding">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Dashboard de Administración
        </h1>
        <p className="text-neutral-600">
          Gestiona tu tienda desde aquí
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-neutral-900">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Gestión de Productos
          </h2>
          <p className="text-neutral-600 mb-6 flex-grow">
            Crea, edita y elimina productos de tu catálogo
          </p>
          <Link to="/admin/products" className="mt-auto">
            <Button variant="primary" fullWidth>
              Gestionar Productos
            </Button>
          </Link>
        </Card>

        <Card className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Gestión de Pedidos
          </h2>
          <p className="text-neutral-600 mb-6 flex-grow">
            Revisa y gestiona los pedidos realizados
          </p>
          <Link to="/admin/orders" className="mt-auto">
            <Button variant="primary" fullWidth>
              Ver Pedidos
            </Button>
          </Link>
        </Card>

        <Card className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Volver a la Tienda
          </h2>
          <p className="text-neutral-600 mb-6 flex-grow">
            Regresa a la vista de cliente
          </p>
          <Link to="/products" className="mt-auto">
            <Button variant="primary" fullWidth>
              Ver Catálogo
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
