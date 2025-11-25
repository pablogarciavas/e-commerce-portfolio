import { useState, useEffect } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import Modal from '../common/Modal'

function ProductForm({ product, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        image: product.image || '',
        category: product.category || '',
        stock: product.stock?.toString() || '0'
      })
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: ''
      })
    }
    setErrors({})
  }, [product, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida'
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es requerida'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida'
    }

    if (formData.stock && parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock no puede ser negativo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    const productData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      image: formData.image.trim(),
      category: formData.category.trim().toLowerCase(),
      stock: parseInt(formData.stock) || 0
    }

    onSubmit(productData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Editar Producto' : 'Crear Nuevo Producto'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nombre del producto"
          error={errors.title}
          required
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
            rows={4}
            className={`input ${errors.description ? 'border-red-500' : ''}`}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Precio (€)"
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            error={errors.price}
            required
          />

          <Input
            label="Stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            error={errors.stock}
          />
        </div>

        <Input
          label="Categoría"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="electronics, clothing, etc."
          error={errors.category}
          required
        />

        <Input
          label="URL de la Imagen"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          error={errors.image}
          required
        />

        {formData.image && (
          <div className="mt-4">
            <p className="text-sm font-medium text-neutral-700 mb-2">Vista previa:</p>
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-48 object-contain bg-neutral-100 rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            {product ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductForm

