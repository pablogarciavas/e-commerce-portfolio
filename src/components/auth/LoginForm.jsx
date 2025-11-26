import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const errorRef = useRef(null)
  const formRef = useRef(null)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (error && errorRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (!prefersReducedMotion) {
        gsap.fromTo(
          errorRef.current,
          { x: -10 },
          {
            x: [10, -10, 10, -10, 0],
            duration: 0.5,
            ease: 'power2.inOut'
          }
        )
      }
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      navigate('/products')
    } else {
      setError(result.error)
    }

    setIsLoading(false)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div ref={errorRef} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        disabled={isLoading}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>

      <p className="text-center text-sm text-neutral-600">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Regístrate aquí
        </Link>
      </p>
    </form>
  )
}

export default LoginForm

