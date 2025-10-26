# Aura Frontend

Una aplicación web moderna construida con React, Tailwindcss, y Vite para la gestión de usuarios y autenticación.

## Stack Tecnológico

### Core

- **React 18** - Biblioteca de UI con hooks y componentes funcionales
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Build tool rápido y moderno
- **React Router** - Enrutamiento del lado del cliente
- **Tailwind** - Framework usado para diseño

### Estado y Datos

- **Zustand** - Gestión de estado global ligera y simple
- **Formik + Yup** - Manejo de formularios con validación
- **Axios** - Cliente HTTP para comunicación con API

### Estilos

- **Tailwind CSS** - Framework de utilidades CSS
- **PostCSS** - Procesamiento de CSS

### Herramientas

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Docker** - Containerización (base de datos)

## Arquitectura

### Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── forms/          # Formularios (Login, Register)
│   ├── layout/         # Layouts y navegación
│   └── ui/             # Componentes base (Button, Input, Modal)
├── hooks/              # Hooks personalizados
├── pages/              # Páginas de la aplicación
├── services/           # Servicios y API
├── stores/             # Estado global (Zustand)
├── types/              # Definiciones de TypeScript
└── utils/              # Utilidades y helpers
```

### Patrones Implementados

#### 1. **Custom Hooks Pattern**

```typescript
// Ejemplo: useLogin, useRegister, useAuth
const { login, loading, error } = useLogin();
```

#### 2. **Service Layer Pattern**

```typescript
// Separación clara entre lógica de negocio y UI
authService.login(credentials);
```

#### 3. **Store Pattern (Zustand)**

```typescript
// Estado global centralizado
const { user, isAuthenticated, logout } = useAuthStore();
```

#### 4. **Component Composition**

```typescript
// Componentes pequeños y reutilizables
<Input type="email" placeholder="Email" />
<Button onClick={handleSubmit}>Submit</Button>
```

## Configuraciones de Alias

```typescript
// tsconfig.json y vite.config.ts
"@/*": "./src/*"
"@components/*": "./src/components/*"
"@hooks/*": "./src/hooks/*"
"@services/*": "./src/services/*"
"@stores/*": "./src/stores/*"
"@types/*": "./src/types/*"
"@utils/*": "./src/utils/*"
```

## Hooks Personalizados

### Autenticación

- **`useLogin`** - Manejo de login con estados de loading/error
- **`useRegister`** - Registro de usuarios con validación
- **`useAuth`** - Estado de autenticación global

### Datos

- **`useProfile`** - Gestión de perfil de usuario
- **`useUsers`** - Lista y gestión de usuarios
- **`useUpdateProfile`** - Actualización de perfil

### UI/UX

- **`useUIStore`** - Estado de UI (sidebar, modals, theme)

## Características Implementadas

### Autenticación

- [x] Login con email/password
- [x] Registro de usuarios
- [x] Protección de rutas
- [x] Redirección automática
- [x] Persistencia de sesión

### Gestión de Usuarios

- [x] Lista de usuarios
- [x] Perfil de usuario
- [x] Actualización de datos
- [x] Estados de loading/error

### UI/UX

- [x] Diseño responsivo
- [x] Sidebar colapsible
- [x] Modales
- [x] Notificaciones
- [x] Tema claro/oscuro

## Próximas Implementaciones

### Funcionalidades

- [ ] Dashboard con métricas
- [ ] Sistema de roles y permisos
- [ ] Notificaciones en tiempo real
- [ ] Búsqueda y filtros avanzados
- [ ] Exportación de datos
- [ ] Configuraciones de usuario

### TODO PROXIMOS

- [ ] Testing (Jest + React Testing Library)
- [ ] Storybook para componentes
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)
- [ ] Optimización de performance
- [ ] CI/CD pipeline

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Dependencias Principales

```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^4.4.0",
  "zustand": "^4.4.0",
  "formik": "^2.4.0",
  "yup": "^1.3.0",
  "axios": "^1.5.0",
  "react-router-dom": "^6.15.0",
  "tailwindcss": "^3.3.0"
}
```
MR :)
.