# E-Commerce Portfolio

Plataforma de e-commerce completa desarrollada como proyecto de portfolio. Este proyecto demuestra habilidades en desarrollo front-end con React, manejo de estado, animaciones avanzadas y diseño de interfaces de usuario.

## 📋 Descripción del Proyecto

Este es un proyecto de e-commerce funcional diseñado para ser mostrado en un portfolio profesional. El proyecto funciona completamente en local sin necesidad de base de datos, utilizando localStorage para la persistencia de datos. Está construido con React y Vite, e incluye animaciones avanzadas con GSAP.

## 🎯 Objetivos del Proyecto

- Demostrar habilidades en desarrollo front-end con React
- Implementar un sistema completo de e-commerce funcional
- Mostrar capacidad para manejar estado complejo
- Demostrar habilidades en animaciones y UX
- Crear una aplicación responsive y moderna

## ✨ Funcionalidades Principales

### 1. Gestión de Productos (CRUD)
- **Crear**: Agregar nuevos productos al catálogo
- **Leer**: Visualizar catálogo completo de productos
- **Actualizar**: Modificar información de productos existentes
- **Eliminar**: Remover productos del catálogo
- Solo disponible para usuarios administradores

### 2. Carrito de Compras
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos del carrito
- Cálculo automático de totales
- Persistencia en localStorage
- Manejo avanzado del estado con Context API

### 3. Sistema de Filtros y Búsqueda
- Filtrado por categorías
- Filtrado por precio
- Filtrado por disponibilidad
- Búsqueda por nombre/descripción
- Combinación de múltiples filtros
- Búsqueda en tiempo real

### 4. Autenticación de Usuarios
- Registro de nuevos usuarios
- Inicio de sesión
- Cierre de sesión
- Persistencia de sesión en localStorage
- Protección de rutas
- Roles de usuario (cliente/admin)

### 5. Dashboard de Administración
- Acceso exclusivo para administradores
- Panel de gestión de productos
- Estadísticas básicas
- Gestión de usuarios (opcional)

### 6. Integración de Pagos (Stripe Fake)
- Simulación de proceso de pago
- Formulario de checkout
- Validación de datos de pago
- Confirmación de pedido
- Sin procesamiento real de pagos

### 7. Persistencia Local
- Datos de productos en archivos JSON
- Carrito guardado en localStorage
- Sesiones de usuario en localStorage
- Preferencias del usuario
- Historial de pedidos

### 8. Testing Básico
- Tests unitarios de componentes
- Tests de funcionalidades principales
- Validación de formularios

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.0**: Biblioteca principal para la interfaz
- **Vite 7.2.4**: Herramienta de desarrollo y build
- **React Router DOM 6.26.0**: Navegación y routing
- **GSAP 3.12.5**: Animaciones avanzadas
- **Tailwind CSS 3.4.13**: Framework de estilos utility-first

### Estado y Datos
- **Context API**: Manejo global del estado
- **localStorage**: Persistencia de datos local
- **JSON**: Almacenamiento de datos de productos

### Desarrollo
- **ESLint**: Linter para calidad de código
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad de CSS

## 📁 Estructura del Proyecto

```
e-commerce-portfolio/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/            # Imágenes, iconos, recursos
│   ├── components/        # Componentes reutilizables
│   │   ├── common/        # Componentes comunes (Button, Input, etc.)
│   │   ├── product/       # Componentes de productos
│   │   ├── cart/          # Componentes del carrito
│   │   └── auth/          # Componentes de autenticación
│   ├── context/           # Context providers (Cart, Auth, Products)
│   ├── data/              # Datos estáticos (productos.json, etc.)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Admin/
│   ├── styles/            # Estilos globales
│   │   └── index.css
│   ├── utils/             # Funciones utilitarias
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Punto de entrada
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/pablogarciavas/e-commerce-portfolio.git
   cd e-commerce-portfolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter

## 🎨 Características de Diseño

- **Responsive Design**: Adaptable a todos los dispositivos
- **Animaciones GSAP**: Transiciones suaves y profesionales
- **UI Moderna**: Diseño limpio y contemporáneo con Tailwind CSS
- **Accesibilidad**: Consideraciones básicas de accesibilidad
- **Dark Mode**: (Opcional) Soporte para modo oscuro

## 📊 Funcionalidades Técnicas

### Manejo de Estado
- Context API para estado global (carrito, autenticación, productos)
- Estado local para componentes específicos
- Sincronización con localStorage

### Animaciones GSAP
- Transiciones de página
- Animaciones de productos al cargar
- Efectos en el carrito
- Animaciones de botones y hover
- Transiciones suaves en filtros/búsqueda

### Routing
- Rutas protegidas para admin
- Rutas públicas para catálogo
- Navegación fluida entre secciones

## 🔐 Autenticación y Roles

### Usuario Cliente
- Ver catálogo de productos
- Agregar productos al carrito
- Realizar compras
- Ver historial de pedidos

### Usuario Administrador
- Todas las funcionalidades de cliente
- Acceso al dashboard de administración
- CRUD completo de productos
- Gestión de usuarios (opcional)

## 📦 Datos y Persistencia

### Productos
- Almacenados en `src/data/products.json`
- Estructura: id, nombre, descripción, precio, imagen, categoría, stock

### Usuarios
- Almacenados en localStorage
- Estructura: id, email, nombre, rol, fecha de registro

### Carrito
- Almacenado en localStorage
- Sincronizado con el estado de React
- Persiste entre sesiones

### Pedidos
- Almacenados en localStorage
- Historial completo de compras
- Estado de cada pedido

## 🧪 Testing

- Tests unitarios con Jest y React Testing Library
- Tests de componentes principales
- Tests de funcionalidades críticas
- Validación de formularios

## 📝 Notas de Desarrollo

- El proyecto no utiliza base de datos, todo funciona en local
- Los datos persisten en localStorage y archivos JSON
- Las animaciones GSAP están integradas en componentes clave
- El código está organizado de forma modular y escalable
- Se sigue buenas prácticas de React y desarrollo front-end

## 🎯 Próximas Mejoras (Opcional)

- [ ] Modo oscuro
- [ ] Sistema de reseñas y valoraciones
- [ ] Wishlist/Favoritos
- [ ] Comparador de productos
- [ ] Notificaciones en tiempo real
- [ ] Mejoras en accesibilidad
- [ ] Optimización de rendimiento
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso en portfolio.

## 👤 Autor

Desarrollado como proyecto de portfolio para demostrar habilidades en desarrollo front-end.

## 🔗 Enlaces

- [Repositorio en GitHub](https://github.com/pablogarciavas/e-commerce-portfolio)
- [Demo en vivo](https://pablogarciavas.github.io/e-commerce-portfolio) (cuando esté desplegado)

---

**Nota**: Este proyecto es una demostración técnica y no procesa pagos reales. Todos los datos se almacenan localmente en el navegador.
