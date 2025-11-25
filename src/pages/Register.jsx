import RegisterForm from '../components/auth/RegisterForm'
import Card from '../components/common/Card'

function Register() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-md mx-auto">
        <Card>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 text-center">
            Crear Cuenta
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Completa el formulario para registrarte
          </p>
          <RegisterForm />
        </Card>
      </div>
    </div>
  )
}

export default Register
