import { useState } from 'react'
import { useProducts } from '../../context/ProductContext'
import { formatPrice } from '../../utils/formatters'
import ProductForm from '../../components/product/ProductForm'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const localProducts = products.filter(p => !p.rating)
  const apiProducts = products.filter(p => p.rating)

  const handleCreate = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = (product) => {
    setDeleteConfirm(product)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteProduct(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const ProductRow = ({ product, isLocal }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-200 hover:shadow-soft transition-shadow">
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-neutral-900 mb-1 truncate">
          {product.title}
        </h3>
        <p className="text-sm text-neutral-600 mb-1">
          {product.category && (
            <span className="capitalize">{product.category}</span>
          )}
          {product.stock !== undefined && (
            <span className="ml-2">• Stock: {product.stock}</span>
          )}
        </p>
        <p className="text-lg font-bold text-primary-600">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {isLocal ? (
          <>
            <button
              onClick={() => handleEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(product)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <span className="text-xs text-neutral-500 px-2 py-1 bg-neutral-100 rounded">
            De API
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="container-custom section-padding">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Gestión de Productos
          </h1>
          <p className="text-neutral-600">
            {products.length} {products.length === 1 ? 'producto' : 'productos'} en total
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleCreate}
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Producto
        </Button>
      </div>

      {localProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Productos Locales ({localProducts.length})
          </h2>
          <div className="space-y-3">
            {localProducts.map((product) => (
              <ProductRow key={product.id} product={product} isLocal={true} />
            ))}
          </div>
        </div>
      )}

      {apiProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Productos de la API ({apiProducts.length})
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            Estos productos provienen de Fake Store API y no se pueden editar
          </p>
          <div className="space-y-3">
            {apiProducts.map((product) => (
              <ProductRow key={product.id} product={product} isLocal={false} />
            ))}
          </div>
        </div>
      )}

      {products.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-neutral-600 mb-6">
            No hay productos. Crea tu primer producto para comenzar.
          </p>
          <Button variant="primary" onClick={handleCreate}>
            Crear Primer Producto
          </Button>
        </Card>
      )}

      <ProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingProduct(null)
        }}
        onSubmit={handleFormSubmit}
      />

      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-neutral-700">
            ¿Estás seguro de que quieres eliminar el producto{' '}
            <strong>{deleteConfirm?.title}</strong>?
          </p>
          <p className="text-sm text-neutral-600">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setDeleteConfirm(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProductManagement
