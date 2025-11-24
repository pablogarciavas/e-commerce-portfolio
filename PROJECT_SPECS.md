# Especificaciones Técnicas del Proyecto E-Commerce Portfolio

## 📐 Arquitectura del Proyecto

### Estructura de Carpetas Detallada

```
src/
├── components/           # Componentes reutilizables
│   ├── common/          # Componentes comunes
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Card.jsx
│   │   └── Loading.jsx
│   ├── product/         # Componentes relacionados con productos
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ProductForm.jsx
│   ├── cart/            # Componentes del carrito
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── CartIcon.jsx
│   ├── auth/            # Componentes de autenticación
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── filters/         # Componentes de filtros
│   │   ├── FilterBar.jsx
│   │   └── SearchBar.jsx
│   └── layout/          # Componentes de layout
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── Navbar.jsx
│
├── pages/               # Páginas principales
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── ProductManagement.jsx
│       └── Orders.jsx
│
├── context/             # Context providers
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── ProductContext.jsx
│   └── index.jsx
│
├── data/                # Datos estáticos
│   ├── products.json
│   └── categories.json
│
├── hooks/               # Custom hooks
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useProducts.js
│   └── useLocalStorage.js
│
├── utils/               # Funciones utilitarias
│   ├── storage.js       # Funciones de localStorage
│   ├── validators.js    # Validaciones de formularios
│   ├── formatters.js    # Formateo de datos (precios, fechas)
│   └── constants.js     # Constantes de la aplicación
│
├── styles/              # Estilos
│   ├── index.css        # Estilos globales con Tailwind
│   └── animations.js    # Configuraciones de animaciones GSAP
│
└── assets/              # Recursos estáticos
    ├── images/
    └── icons/
```

## 🔧 Configuración Técnica

### Dependencias Principales

#### Producción
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `react-router-dom`: ^6.26.0
- `gsap`: ^3.12.5

#### Desarrollo
- `vite`: ^7.2.4
- `@vitejs/plugin-react`: ^5.1.1
- `tailwindcss`: ^3.4.13
- `postcss`: ^8.4.47
- `autoprefixer`: ^10.4.20
- `eslint`: ^9.39.1

### Configuración de Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### Configuración de Tailwind CSS

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#...',
        secondary: '#...',
      },
    },
  },
  plugins: [],
}
```

## 📊 Modelos de Datos

### Producto

```javascript
{
  id: string (UUID),
  name: string,
  description: string,
  price: number,
  image: string (URL),
  category: string,
  stock: number,
  rating: number (0-5),
  reviews: number,
  createdAt: string (ISO date),
  updatedAt: string (ISO date)
}
```

### Usuario

```javascript
{
  id: string (UUID),
  email: string,
  password: string (hashed),
  name: string,
  role: 'customer' | 'admin',
  createdAt: string (ISO date)
}
```

### Item del Carrito

```javascript
{
  productId: string,
  quantity: number,
  price: number (snapshot del precio al agregar)
}
```

### Pedido

```javascript
{
  id: string (UUID),
  userId: string,
  items: Array<CartItem>,
  total: number,
  status: 'pending' | 'completed' | 'cancelled',
  paymentMethod: string,
  shippingAddress: object,
  createdAt: string (ISO date)
}
```

## 🔄 Flujos de la Aplicación

### Flujo de Autenticación

1. Usuario accede a `/login` o `/register`
2. Completa formulario
3. Validación de datos
4. Creación/inicio de sesión
5. Guardado en localStorage
6. Redirección según rol:
   - Cliente → `/products`
   - Admin → `/admin/dashboard`

### Flujo de Compra

1. Usuario navega por productos
2. Agrega productos al carrito
3. Accede a `/cart`
4. Revisa items y totales
5. Procede a `/checkout`
6. Completa información de envío
7. Simula pago (Stripe fake)
8. Confirmación de pedido
9. Guardado en localStorage
10. Vaciar carrito
11. Redirección a página de confirmación

### Flujo de Administración

1. Admin inicia sesión
2. Accede a `/admin/dashboard`
3. Puede:
   - Ver estadísticas
   - Gestionar productos (CRUD)
   - Ver pedidos
   - Gestionar usuarios (opcional)

## 🎨 Sistema de Animaciones GSAP

### Tipos de Animaciones

1. **Transiciones de Página**
   - Fade in/out
   - Slide transitions
   - Scale animations

2. **Animaciones de Productos**
   - Stagger animation al cargar lista
   - Hover effects
   - Agregar al carrito animation

3. **Animaciones del Carrito**
   - Slide in/out del carrito
   - Animación de items al agregar
   - Contador animado

4. **Animaciones de UI**
   - Loading spinners
   - Modal animations
   - Button hover effects
   - Form validations

### Implementación GSAP

```javascript
// Ejemplo de animación de productos
import { gsap } from 'gsap'

useEffect(() => {
  gsap.from('.product-card', {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.5
  })
}, [products])
```

## 🔐 Sistema de Autenticación

### Almacenamiento
- Usuarios en localStorage bajo clave `users`
- Sesión actual en localStorage bajo clave `currentUser`
- Token de sesión (opcional)

### Validaciones
- Email válido
- Contraseña mínima 6 caracteres
- Email único en registro
- Credenciales correctas en login

### Protección de Rutas
- Rutas públicas: `/`, `/products`, `/product/:id`
- Rutas protegidas: `/cart`, `/checkout`
- Rutas admin: `/admin/*`

## 🛒 Sistema de Carrito

### Estado del Carrito
- Almacenado en Context API
- Sincronizado con localStorage
- Persiste entre sesiones
- Actualización en tiempo real

### Funcionalidades
- Agregar producto
- Actualizar cantidad
- Eliminar producto
- Calcular subtotal
- Calcular total con impuestos
- Vaciar carrito
- Validar stock disponible

## 🔍 Sistema de Filtros y Búsqueda

### Filtros Disponibles
- Por categoría
- Por rango de precio
- Por disponibilidad (en stock)
- Por rating

### Búsqueda
- Por nombre
- Por descripción
- Búsqueda en tiempo real
- Case insensitive

### Implementación
- Filtros combinables
- Estado en URL (opcional)
- Persistencia de filtros seleccionados

## 💳 Integración de Pagos (Stripe Fake)

### Simulación
- Formulario de tarjeta de crédito
- Validación de formato
- No procesa pagos reales
- Genera confirmación de pedido

### Datos Requeridos
- Número de tarjeta (formato validado)
- Fecha de expiración
- CVV
- Nombre del titular
- Dirección de envío

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Adaptaciones
- Grid responsive de productos
- Menú hamburguesa en móvil
- Carrito lateral en desktop, modal en móvil
- Formularios adaptados

## 🧪 Testing

### Estrategia de Testing
- Tests unitarios de componentes
- Tests de hooks personalizados
- Tests de utilidades
- Tests de integración básicos

### Herramientas (a implementar)
- Jest
- React Testing Library
- Coverage mínimo: 60%

## 🚀 Optimizaciones

### Performance
- Lazy loading de imágenes
- Code splitting por rutas
- Memoización de componentes
- Optimización de re-renders

### SEO
- Meta tags
- Semantic HTML
- Alt text en imágenes
- Estructura de datos (JSON-LD opcional)

## 📝 Convenciones de Código

### Nomenclatura
- Componentes: PascalCase (`ProductCard.jsx`)
- Hooks: camelCase con prefijo `use` (`useAuth.js`)
- Utilidades: camelCase (`formatPrice.js`)
- Constantes: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estructura de Componentes
```javascript
// Imports
import React from 'react'
import { ... } from '...'

// Componente
function ComponentName({ prop1, prop2 }) {
  // Hooks
  const [state, setState] = useState()
  
  // Effects
  useEffect(() => {
    // ...
  }, [])
  
  // Handlers
  const handleClick = () => {
    // ...
  }
  
  // Render
  return (
    // JSX
  )
}

export default ComponentName
```

## 🔄 Gestión de Estado

### Context API Structure
- `AuthContext`: Usuario actual, login, logout
- `CartContext`: Items del carrito, operaciones
- `ProductContext`: Lista de productos, filtros

### Local State
- Formularios
- UI state (modales, dropdowns)
- Estado temporal de componentes

## 📦 Persistencia de Datos

### localStorage Keys
- `users`: Array de usuarios registrados
- `currentUser`: Usuario actual logueado
- `cart`: Items del carrito
- `orders`: Historial de pedidos
- `products`: Catálogo de productos (opcional, puede ser JSON)

### Funciones de Utilidad
```javascript
// utils/storage.js
export const saveToStorage = (key, value) => { ... }
export const getFromStorage = (key) => { ... }
export const removeFromStorage = (key) => { ... }
export const clearStorage = () => { ... }
```

## 🎯 Prioridades de Implementación

> **Nota**: Para un plan de trabajo detallado paso a paso, consulta `WORK_PLAN.md`

### Fase 1: Base
1. Estructura de carpetas
2. Configuración de herramientas
3. Routing básico
4. Layout principal

### Fase 2: Productos
1. Lista de productos
2. Detalle de producto
3. Filtros y búsqueda
4. **Integración con Fake Store API** (https://fakestoreapi.com/)
5. Datos locales adicionales (para productos creados por admin)

### Fase 3: Carrito
1. Context del carrito
2. Agregar/eliminar items
3. Página del carrito
4. Persistencia

### Fase 4: Autenticación
1. Login/Register
2. AuthContext
3. Protección de rutas
4. Roles de usuario

### Fase 5: Admin
1. Dashboard
2. CRUD de productos
3. Gestión de pedidos

### Fase 6: Checkout
1. Formulario de checkout
2. Integración Stripe fake
3. Confirmación de pedido

### Fase 7: Animaciones
1. Integración GSAP
2. Animaciones de productos
3. Animaciones de carrito
4. Transiciones de página

### Fase 8: Testing
1. Configuración de tests
2. Tests de componentes
3. Tests de funcionalidades

---

## 🔌 Integración de APIs

### Fake Store API
- **URL**: https://fakestoreapi.com/
- **Uso**: Obtener productos, categorías y datos de ejemplo
- **Endpoints principales**:
  - `GET /products` - Todos los productos
  - `GET /products/:id` - Detalle de producto
  - `GET /products/category/:category` - Productos por categoría
  - `GET /categories` - Lista de categorías
- **Estrategia**: Cargar desde API + guardar en localStorage + permitir productos locales del admin

---

**Última actualización**: Estructura base del proyecto creada. Plan de trabajo detallado en `WORK_PLAN.md`

