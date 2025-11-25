import LoginForm from '../components/auth/LoginForm'
import Card from '../components/common/Card'

function Login() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-md mx-auto">
        <Card>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 text-center">
            Iniciar Sesión
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Ingresa tus credenciales para continuar
          </p>
          <LoginForm />
        </Card>
      </div>
    </div>
  )
}

export default Login
