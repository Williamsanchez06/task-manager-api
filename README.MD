# Task Manager API

API RESTful construida con **Node.js** y **Express** para la gestión de usuarios y tareas, con autenticación basada en **JWT**.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Endpoints Principales](#endpoints-principales)
    - [Usuarios](#usuarios)
    - [Tareas](#tareas)
    - [Autenticación](#autenticación)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Descripción General

Este proyecto es un administrador de tareas que permite:
- **Crear, editar y eliminar** tareas.
- **Compartir** tareas con otros usuarios.
- **Registrar y autenticar** usuarios con **JWT**.
- Listar tareas propias y tareas compartidas.

Se utiliza **PostgreSQL** como base de datos y **Sequelize** como ORM. El proyecto incluye validaciones de datos con **Joi**, manejo de errores con **Boom**, y un logger configurado con **Winston** para la generación y rotación de logs.

---

## Características Principales

1. **Autenticación con JWT**:
    - Los endpoints protegidos requieren un token válido (`validateJwtHandler`) para acceder.

2. **Usuarios**:
    - Creación de usuarios.
    - Listar todos los usuarios.
    - Obtención de usuario por ID.

3. **CRUD de Tareas**:
    - Creación, edición y eliminación de tareas.
    - Compartir tareas con otros usuarios.
    - Listado de tareas propias y tareas compartidas.

4. **Validación de Datos**:
    - Uso de **Joi** y un middleware genérico `validatorHandler` para validar tanto **params**, **body** como **query**.

5. **Manejo de Errores**:
    - Middlewares especializados para capturar y manejar excepciones (Boom, Sequelize, errores generales).

6. **Logger**:
    - Winston con transporte para consola y archivos diarios, con retención de 30 días (configurable).

---

## Requisitos

- **Node.js**: Se recomienda la versión `v18.20.5`.
- **NPM**: Para la instalación de dependencias.
- **PostgreSQL**: Debes contar con una instancia de PostgreSQL 15 en ejecución.
- **Git**: Para clonar el repositorio (opcional, si lo descargas como ZIP no es necesario).

---

## Instalación

1. **Clona el Repositorio** (o descarga el código):
   ```bash
   git https://github.com/Williamsanchez06/task-manager-api.git
   cd task-manager-api
   ```

2. **Instala las Dependencias**:
   ```bash
   npm install
   ```
---

## Configuración

1. **Variables de Entorno**  
   Crea un archivo `.env` en la raíz del proyecto (asegúrate de que no se suba al repositorio). Por ejemplo:

   ```env
   # Configuración de la Base de Datos
   DB_NAME=tasks
   DB_USER=postgres
   DB_PASSWORD=12345
   HOST_SQL=localhost
   PORT_SQL=5432
   DB_SSL=false

   # Configuración del Servidor
   PORT=3000
   NODE_ENV=development

   # Configuración de JWT
   JWT_SECRET_SEED=clave-secreta
   JWT_EXPIRES_IN=1d
   ```

   > **Nota:** En el archivo de conexión a la base de datos (`db.js`) hay valores por defecto para simplificar pruebas locales.  
   > Si no defines las variables de entorno, se usarán las predeterminadas (por ejemplo, `tasks`, `postgres`, `12345`, etc.).
   > Del mismo modo, en la configuración del token JWT, si no defines `SECRET_JWT_SEED` o `JWT_EXPIRES_IN`, se usarán valores predeterminados ("clave-secreta-por-defecto" y "30d" respectivamente).

2. **Crear la Base de Datos**  
   Asegúrate de crear una base de datos en PostgreSQL con el nombre `tasks`

---

## Ejecución

### Modo Desarrollo

Si deseas ver cambios en tiempo real con **nodemon**, ejecuta:
```bash
npm run dev
```
Esto levantará el servidor en el puerto definido en tu `.env` (por defecto `3000`).

### Modo Producción

1. Asegúrate de definir `NODE_ENV=production` y las demás variables de entorno.
2. Ejecuta:
   ```bash
   npm start
   ```

---