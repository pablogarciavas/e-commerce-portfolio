import { useState } from 'react'
import Input from '../common/Input'
import { validateCardNumber, validateCVV, validateExpiryDate } from '../../utils/validators'

function PaymentForm({ onPaymentSubmit }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4)
      }
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
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

    if (!formData.cardNumber || !validateCardNumber(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Número de tarjeta inválido'
    }

    if (!formData.expiryDate || !validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Fecha de expiración inválida'
    }

    if (!formData.cvv || !validateCVV(formData.cvv)) {
      newErrors.cvv = 'CVV inválido'
    }

    if (!formData.cardName || formData.cardName.trim().length < 3) {
      newErrors.cardName = 'Nombre del titular requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onPaymentSubmit({
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        cardName: formData.cardName.trim()
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Número de Tarjeta"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        error={errors.cardNumber}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fecha de Expiración"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          placeholder="MM/AA"
          maxLength={5}
          error={errors.expiryDate}
          required
        />

        <Input
          label="CVV"
          name="cvv"
          type="password"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="123"
          maxLength={4}
          error={errors.cvv}
          required
        />
      </div>

      <Input
        label="Nombre del Titular"
        name="cardName"
        value={formData.cardName}
        onChange={handleChange}
        placeholder="JUAN PEREZ"
        error={errors.cardName}
        required
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Nota:</strong> Este es un entorno de prueba. No se procesarán pagos reales.
        </p>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Procesar Pago
      </button>
    </form>
  )
}

export default PaymentForm

