# Plan de Trabajo Detallado - E-Commerce Portfolio

Este documento contiene el plan de trabajo completo para desarrollar el proyecto de e-commerce portfolio. Úsalo como referencia en futuras sesiones.

## 📋 Resumen del Proyecto

- **Stack**: React + Vite + Tailwind CSS + GSAP + React Router
- **API**: Fake Store API (https://fakestoreapi.com/)
- **Iconos**: Heroicons
- **Persistencia**: localStorage
- **Estilo**: Moderno, minimalista, responsive

---

## 🎯 Fase 1: Fundamentos y Layout (Base Sólida)

### Objetivo
Crear la estructura base navegable con componentes comunes y layout principal.

### Tareas

1. **Instalar Heroicons**
   - Instalar `@heroicons/react`
   - Configurar importaciones

2. **Componentes Base Comunes**
   - `Button.jsx` - Botón reutilizable con variantes (primary, secondary, outline, ghost)
   - `Input.jsx` - Input con validación y estados
   - `Card.jsx` - Tarjeta base reutilizable
   - `Modal.jsx` - Modal reutilizable
   - `Loading.jsx` - Spinner de carga
   - Todos con estilos Tailwind y responsive

3. **Layout Principal**
   - `Header.jsx` - Header con logo, navegación y carrito icon
   - `Footer.jsx` - Footer con información
   - `Navbar.jsx` - Navegación responsive (hamburguesa en móvil)
   - `Layout.jsx` - Wrapper principal que incluye Header y Footer

4. **Routing Básico**
   - Instalar y configurar React Router DOM
   - Crear rutas principales:
     - `/` - Home
     - `/products` - Lista de productos
     - `/product/:id` - Detalle de producto
     - `/cart` - Carrito
     - `/checkout` - Checkout
     - `/login` - Login
     - `/register` - Registro
     - `/admin/*` - Rutas admin
   - Configurar navegación entre rutas

### Resultado Esperado
✅ Estructura base navegable con componentes reutilizables y layout responsive

---

## 🛍️ Fase 2: Datos y Productos (Core del E-Commerce)

### Objetivo
Implementar el sistema de productos usando Fake Store API y crear las páginas principales de productos.

### Tareas

1. **Configurar Fake Store API**
   - Crear `utils/api.js` con funciones para llamar a la API
   - Endpoints a implementar:
     - `getAllProducts()` - GET /products
     - `getProduct(id)` - GET /products/:id
     - `getProductsByCategory(category)` - GET /products/category/:category
     - `getCategories()` - GET /categories
   - Manejo de errores y loading states

2. **Utilidades**
   - `utils/storage.js` - Funciones de localStorage (save, get, remove, clear)
   - `utils/formatters.js` - Formateo de precios, fechas
   - `utils/validators.js` - Validaciones básicas

3. **ProductContext**
   - Crear `context/ProductContext.jsx`
   - Estado: products, categories, loading, error
   - Funciones:
     - `loadProducts()` - Cargar desde API
     - `getProductById(id)` - Obtener producto por ID
     - `getProductsByCategory(category)` - Filtrar por categoría
     - `addProduct(product)` - Agregar producto local
     - `updateProduct(id, product)` - Actualizar producto
     - `deleteProduct(id)` - Eliminar producto
   - Sincronización con localStorage

4. **Página de Productos**
   - `pages/Products.jsx` - Lista principal de productos
   - `components/product/ProductCard.jsx` - Tarjeta de producto
   - `components/product/ProductList.jsx` - Grid responsive de productos
   - Grid responsive (1 col móvil, 2 tablet, 3-4 desktop)
   - Loading state mientras carga
   - Error state si falla la carga

5. **Detalle de Producto**
   - `pages/ProductDetail.jsx` - Página de detalle
   - Mostrar: imagen, título, precio, descripción, rating, categoría
   - Botón "Agregar al carrito"
   - Galería de imágenes (si hay múltiples)
   - Breadcrumbs

### Resultado Esperado
✅ Catálogo de productos funcional con datos de Fake Store API, páginas de lista y detalle

---

## 🔍 Fase 3: Filtros y Búsqueda (Mejorar UX)

### Objetivo
Implementar sistema de filtrado y búsqueda para mejorar la experiencia del usuario.

### Tareas

1. **Componentes de Filtros**
   - `components/filters/FilterBar.jsx` - Barra de filtros
     - Filtro por categoría (dropdown)
     - Filtro por rango de precio (slider o inputs)
     - Filtro por rating (estrellas)
     - Botón "Limpiar filtros"
   - `components/filters/SearchBar.jsx` - Barra de búsqueda
     - Búsqueda en tiempo real
     - Icono de búsqueda
     - Placeholder descriptivo

2. **Lógica de Filtrado**
   - Crear funciones de filtrado en `utils/filters.js`
   - Filtros combinables (categoría + precio + rating)
   - Búsqueda por nombre y descripción (case insensitive)
   - Actualizar ProductContext con funciones de filtrado

3. **Integración**
   - Conectar filtros con ProductContext
   - Actualizar lista de productos en tiempo real
   - Mostrar cantidad de resultados
   - Mensaje cuando no hay resultados

### Resultado Esperado
✅ Sistema de filtros y búsqueda funcional, mejorando la navegación del catálogo

---

## 🛒 Fase 4: Carrito de Compras (Funcionalidad Crítica)

### Objetivo
Implementar carrito de compras completo con persistencia y sincronización.

### Tareas

1. **CartContext**
   - Crear `context/CartContext.jsx`
   - Estado: items, total, itemCount
   - Funciones:
     - `addToCart(product, quantity)` - Agregar producto
     - `removeFromCart(productId)` - Eliminar producto
     - `updateQuantity(productId, quantity)` - Actualizar cantidad
     - `clearCart()` - Vaciar carrito
     - `getTotal()` - Calcular total
     - `getItemCount()` - Contar items
   - Sincronización automática con localStorage
   - Validar stock disponible

2. **Componentes del Carrito**
   - `components/cart/CartIcon.jsx` - Icono en header con contador
     - Mostrar cantidad de items
     - Animación al agregar producto
   - `components/cart/CartItem.jsx` - Item individual del carrito
     - Imagen, nombre, precio
     - Selector de cantidad
     - Botón eliminar
     - Subtotal del item
   - `components/cart/CartSummary.jsx` - Resumen del carrito
     - Subtotal
     - Impuestos (calculados)
     - Total
     - Botón "Proceder al checkout"

3. **Página del Carrito**
   - `pages/Cart.jsx` - Página completa del carrito
   - Lista de items
   - Resumen de compra
   - Botón "Continuar comprando"
   - Estado vacío (mensaje cuando no hay items)
   - Responsive (sidebar en desktop, página completa en móvil)

4. **Integración**
   - Agregar desde ProductCard
   - Agregar desde ProductDetail
   - Actualizar contador en header en tiempo real
   - Persistencia entre sesiones

### Resultado Esperado
✅ Carrito de compras funcional y persistente, con todas las operaciones CRUD

---

## 🔐 Fase 5: Autenticación (Seguridad y Roles)

### Objetivo
Implementar sistema de autenticación con roles (cliente/admin) y protección de rutas.

### Tareas

1. **Utilidades de Autenticación**
   - `utils/auth.js` - Funciones de autenticación
     - Validación de email
     - Hash básico de contraseñas (o simulación)
     - Verificación de credenciales

2. **AuthContext**
   - Crear `context/AuthContext.jsx`
   - Estado: user, isAuthenticated, isLoading
   - Funciones:
     - `login(email, password)` - Iniciar sesión
     - `register(userData)` - Registrar usuario
     - `logout()` - Cerrar sesión
     - `getCurrentUser()` - Obtener usuario actual
   - Persistencia de sesión en localStorage
   - Verificar sesión al cargar la app

3. **Páginas de Autenticación**
   - `pages/Login.jsx` - Página de login
     - Formulario con email y contraseña
     - Validación en tiempo real
     - Mensajes de error
     - Link a registro
   - `pages/Register.jsx` - Página de registro
     - Formulario completo (nombre, email, contraseña, confirmar)
     - Validaciones
     - Link a login
   - `components/auth/LoginForm.jsx` - Componente de formulario
   - `components/auth/RegisterForm.jsx` - Componente de formulario

4. **Protección de Rutas**
   - Crear `components/ProtectedRoute.jsx`
   - Proteger rutas: `/cart`, `/checkout`
   - Redireccionar a login si no autenticado
   - Crear `components/AdminRoute.jsx`
   - Proteger rutas admin: `/admin/*`
   - Verificar rol de admin
   - Redireccionar si no es admin

5. **Integración en Layout**
   - Mostrar/ocultar botones según autenticación
   - Mostrar nombre de usuario
   - Botón de logout

### Resultado Esperado
✅ Sistema de autenticación completo con roles y protección de rutas

---

## 👨‍💼 Fase 6: Dashboard de Administración (CRUD Productos)

### Objetivo
Implementar panel de administración para gestionar productos.

### Tareas

1. **Página de Dashboard**
   - `pages/Admin/Dashboard.jsx` - Dashboard principal
   - Estadísticas básicas:
     - Total de productos
     - Total de pedidos
     - Usuarios registrados
   - Accesos rápidos a funciones
   - Layout responsive

2. **Gestión de Productos (CRUD)**
   - `pages/Admin/ProductManagement.jsx` - Lista de productos admin
     - Tabla/grid de productos
     - Botones: Editar, Eliminar
     - Botón "Agregar nuevo producto"
   - `components/product/ProductForm.jsx` - Formulario crear/editar
     - Campos: nombre, descripción, precio, imagen, categoría, stock
     - Validaciones
     - Modo crear/editar
   - Funcionalidades:
     - Crear producto (se guarda en localStorage)
     - Editar producto existente
     - Eliminar producto (con confirmación)
     - Validar datos antes de guardar

3. **Gestión de Pedidos (Opcional)**
   - `pages/Admin/Orders.jsx` - Lista de pedidos
   - Ver detalles de pedidos
   - Cambiar estado de pedidos

4. **Integración**
   - Conectar con ProductContext
   - Actualizar lista en tiempo real
   - Sincronizar con localStorage
   - Combinar productos de API + productos locales

### Resultado Esperado
✅ Panel de administración funcional con CRUD completo de productos

---

## 💳 Fase 7: Checkout y Pedidos (Completar Flujo de Compra)

### Objetivo
Completar el flujo de compra con checkout y procesamiento de pedidos.

### Tareas

1. **Página de Checkout**
   - `pages/Checkout.jsx` - Página de checkout
   - Formulario de envío:
     - Nombre completo
     - Dirección
     - Ciudad, Código postal
     - Teléfono
     - Validaciones
   - Resumen del pedido:
     - Lista de productos
     - Subtotal, impuestos, total
   - Método de pago (selección)

2. **Integración Stripe Fake**
   - `components/checkout/PaymentForm.jsx` - Formulario de pago
     - Número de tarjeta (formato validado)
     - Fecha de expiración
     - CVV
     - Nombre del titular
   - Validación de formato de tarjeta
   - Simulación de procesamiento
   - No requiere API real de Stripe

3. **Confirmación de Pedido**
   - `pages/OrderConfirmation.jsx` - Página de confirmación
   - Mostrar número de pedido
   - Resumen del pedido
   - Información de envío
   - Botón "Seguir comprando"

4. **Sistema de Pedidos**
   - Guardar pedido en localStorage
   - Estructura de pedido:
     - ID único
     - Usuario
     - Items
     - Total
     - Dirección de envío
     - Fecha
     - Estado
   - Vaciar carrito después de confirmación

5. **Historial de Pedidos (Opcional)**
   - `pages/Orders.jsx` - Historial del usuario
   - Lista de pedidos anteriores
   - Ver detalle de cada pedido
   - Estado de cada pedido

### Resultado Esperado
✅ Flujo de compra completo desde carrito hasta confirmación de pedido

---

## ✨ Fase 8: Animaciones GSAP (Pulir Experiencia)

### Objetivo
Agregar animaciones profesionales con GSAP para mejorar la experiencia visual.

### Tareas

1. **Animaciones de Productos**
   - Stagger animation al cargar lista de productos
   - Hover effects en ProductCard
   - Animación al agregar producto al carrito
   - Transición suave en cambio de filtros

2. **Animaciones del Carrito**
   - Slide in/out del carrito (si es sidebar)
   - Animación de items al agregar
   - Contador animado en CartIcon
   - Animación al eliminar item

3. **Transiciones de Página**
   - Fade in/out entre páginas
   - Slide transitions
   - Configurar en React Router

4. **Animaciones de UI**
   - Loading spinners animados
   - Modal animations (fade + scale)
   - Button hover effects
   - Form validations (shake, highlight)
   - Toast notifications (slide in)

5. **Optimización**
   - Usar `useGSAP` hook cuando sea posible
   - Limpiar animaciones en unmount
   - Considerar `prefers-reduced-motion`

### Resultado Esperado
✅ Experiencia visual mejorada con animaciones profesionales y suaves

---

## 🧪 Fase 9: Testing y Optimización (Calidad Final)

### Objetivo
Asegurar calidad del código con tests y optimizaciones de performance.

### Tareas

1. **Configuración de Testing**
   - Instalar Jest y React Testing Library
   - Configurar scripts de test
   - Crear estructura de tests

2. **Tests Básicos**
   - Tests de componentes principales:
     - Button, Input, Card
     - ProductCard
     - CartItem
   - Tests de funcionalidades:
     - Agregar al carrito
     - Filtros
     - Autenticación
   - Tests de utilidades:
     - Formatters
     - Validators
     - Storage

3. **Optimizaciones**
   - Lazy loading de imágenes
   - Code splitting por rutas
   - Memoización de componentes pesados
   - Optimización de re-renders
   - Verificar bundle size

4. **Ajustes Finales**
   - Revisar responsive en todos los dispositivos
   - Verificar accesibilidad básica
   - Optimizar imágenes
   - Revisar performance

### Resultado Esperado
✅ Proyecto probado, optimizado y listo para portfolio

---

## 📝 Notas Importantes

### Integración Fake Store API
- Los productos se cargan desde la API al iniciar
- Se guardan en localStorage para persistencia
- Los productos creados por admin se guardan localmente
- Combinar ambos en la lista de productos

### Persistencia
- Usuarios: localStorage key `users`
- Sesión actual: localStorage key `currentUser`
- Carrito: localStorage key `cart`
- Pedidos: localStorage key `orders`
- Productos locales: localStorage key `localProducts`

### Diseño
- Estilo moderno y minimalista
- Totalmente responsive
- Usar componentes de Tailwind predefinidos
- Heroicons para todos los iconos

### Animaciones
- GSAP para animaciones complejas
- Transiciones CSS para efectos simples
- Considerar `prefers-reduced-motion`

---

## 🚀 Orden de Implementación Recomendado

1. **Fase 1** - Base sólida (fundamentos)
2. **Fase 2** - Productos (core del e-commerce)
3. **Fase 3** - Filtros (mejorar UX)
4. **Fase 4** - Carrito (funcionalidad crítica)
5. **Fase 5** - Autenticación (seguridad)
6. **Fase 6** - Admin (CRUD)
7. **Fase 7** - Checkout (completar flujo)
8. **Fase 8** - Animaciones (pulir)
9. **Fase 9** - Testing (calidad)

---

**Última actualización**: Plan creado y listo para seguir en futuras sesiones.

