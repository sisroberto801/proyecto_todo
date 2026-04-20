# 📋 Proyecto Final - Vue 3

## 👨‍💻 Autor

Nombre: Roberto Carlos Olguin Ledezma 

Proyecto desarrollado como parte del Diplomado Fullstack - Módulo Vue 3.

## Accesos en session

User: sergio@email.com

Password: 123456

## 📌 Descripción General

El presente proyecto tiene como objetivo desarrollar una aplicación web utilizando Vue 3, donde el estudiante pondrá en
práctica los conocimientos adquiridos durante el curso.

Este proyecto implementa una aplicación de **gestión de proyectos y tareas**, permitiendo a los usuarios crear proyectos
y asociar tareas específicas a cada proyecto.

Nota: Se reutilizo el codigo del modulo Actual de fullstack todo relacionado a los usuarios.

---

## 🎯 Requisitos del Proyecto

- **Tema del proyecto**: Sistema de gestión de proyectos y tareas
- **Entidades relacionadas**: Project y Task
- **Relación**: Un Project puede tener múltiples Tasks
- **CRUD completo** para cada entidad
- **Filtros** y búsqueda funcional
- **Rutas dinámicas** para detalles
- **Variables de entorno** para configuración
- **Consumo de API** con Axios
- **JSON Server Auth** para gestión de usuarios
- **Protección de rutas** según autenticación

---

## 🧩 Funcionalidades

### 🔐 Autenticación

- Registro de usuarios
- Inicio de sesión (login)
- Manejo de token (JWT)
- Protección de rutas privadas

### 📁 Gestión de Proyectos (Project)

- Crear proyecto
- Listar proyectos
- Editar proyecto
- Eliminar proyecto
- Ver detalles del proyecto con sus tareas

### 📋 Gestión de Tareas (Task)

- Crear tarea asociada a un proyecto
- Listar tareas por proyecto
- Editar tarea
- Eliminar tarea
- Cambiar estado de tarea (completada/pendiente)

### 🔎 Búsqueda y filtros

- Buscador de proyectos por nombre y descripción
- Buscador de tareas por título y contenido
- Filtro de tareas por estado (completada/pendiente)
- Filtro de proyectos por estado

### 🧭 Navegación

- Rutas públicas: Login, Registro
- Rutas privadas: Dashboard, Proyectos, Tareas
- Ruta dinámica: Detalle de proyecto (`/projects/:id`)

---

## 🛠️ Tecnologías utilizadas

- **Vue 3** - Framework frontend
- **Vite** - Build tool
- **Vue Router** - Gestión de rutas
- **Axios** - Consumo de API
- **JSON Server Auth** - Backend simulado con autenticación
- **SCSS** - Preprocesador CSS
- **TypeScript** - Tipado estático

---

## ⚙️ Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto:

```
VITE_API_URL=http://localhost:3000
```

---

## 💻 Instalación del proyecto

```
npm install
```

---

## 🚀 Ejecución en desarrollo

```
npm run dev
```

---

## 🏗️ Compilación para producción

```
npm run build
```

---

## 🗄️ Backend (JSON Server Auth)

El proyecto incluye un archivo `db.json` que simula la base de datos con las entidades:

- `users` - Usuarios del sistema
- `projects` - Proyectos
- `tasks` - Tareas asociadas a proyectos

### Instalación de dependencias del backend

```bash
npm install -g json-server@0.17.1
npm install -g json-server-auth@2.1.0
```

### ▶️ Ejecutar backend

```bash
json-server-auth db.json --port 3000 -r routes.json
```

---

## 📊 Criterios de Evaluación Cumplidos

✅ **Funcionamiento correcto del CRUD** para Project y Task  
✅ **Implementación de relaciones** entre entidades (1-N)  
✅ **Uso adecuado de Vue 3** (Composition API, componentes, reactividad)  
✅ **Consumo de API** con Axios  
✅ **Autenticación y protección de rutas**  
✅ **Uso de variables de entorno**  
✅ **Filtros y buscador funcional**  
✅ **Diseño y experiencia de usuario** responsiva  
✅ **Rutas dinámicas** para detalles de elementos

---

## 🚀 Entrega

- ✅ Repositorio Git con código fuente
- ✅ Sin carpeta `node_modules`
- ✅ Archivo `db.json` incluido
- ✅ Instrucciones claras de ejecución
- ✅ Demo funcional disponible

---

## 📚 Recomendaciones

### IDE

- VS Code + extensión Vue (Volar)
- Deshabilitar Vetur

### Navegador

- Vue Devtools
- Activar Custom Object Formatter

---

