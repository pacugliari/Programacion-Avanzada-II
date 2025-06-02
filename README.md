# Programación Avanzada II

Una aplicación web desarrollada para el curso "Programación Avanzada II". Este proyecto sirve como un sistema de gestión de catálogo de películas, presentando tanto una interfaz web monolítica tradicional (usando plantillas EJS) como una API RESTful. Incluye funcionalidades para la autenticación de usuarios (basada en sesiones para el monolito y basada en JWT para la API), operaciones CRUD de películas, subida de imágenes a Cloudinary y control de acceso basado en roles para ciertas características.

## Tabla de Contenidos

1.  [Características Principales](#características-principales)
2.  [Tecnologías Utilizadas](#tecnologías-utilizadas)
3.  [Prerrequisitos](#prerrequisitos)
4.  [Instalación](#instalación)
5.  [Variables de Entorno](#variables-de-entorno)
6.  [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
7.  [Ejecutando la Aplicación](#ejecutando-la-aplicación)
8.  [Estructura del Proyecto](#estructura-del-proyecto)
9.  [Endpoints de la API](#endpoints-de-la-api)
10. [Rutas del Monolito (Vistas)](#rutas-del-monolito-vistas)
11. [Licencia](#licencia)

## Características Principales

- **Autenticación de Usuarios**:
  - Vistas Monolíticas: Registro e inicio de sesión basados en sesiones.
  - API: Registro e inicio de sesión basados en JWT para autenticación sin estado.
- **Gestión de Películas (CRUD)**:
  - Crear, Leer, Actualizar y Eliminar películas tanto a través de la interfaz web como de la API.
  - Ver información detallada de cada película.
  - Listar todas las películas disponibles con sus detalles esenciales.
- **Manejo de Imágenes**: Los pósters de las películas se suben a Cloudinary para un almacenamiento y entrega eficientes.
- **Control de Acceso Basado en Roles**:
  - Distingue entre usuarios regulares y administradores.
  - Los usuarios administradores tienen privilegios extendidos, como bloquear o desbloquear películas.
- **Estrategia Dual de Almacenamiento de Datos**:
  - **MySQL (vía Sequelize)**: Gestiona datos estructurados para películas, actores, géneros, categorías y tráilers.
  - **MongoDB (vía Mongoose)**: Maneja las cuentas de usuario y el almacenamiento de sesiones.
- **API RESTful**:
  - Proporciona endpoints para películas, actores, géneros, categorías y autenticación.
  - Asegurada mediante autenticación JWT.
- **Renderizado del Lado del Servidor**: Utiliza el motor de plantillas EJS para la parte monolítica de la aplicación.
- **Manejo de Errores**: Implementa middleware personalizado para manejar errores HTTP con gracia tanto en las respuestas de la API como del monolito.
- **Validación de Formularios**: Incluye validación del lado del cliente (JavaScript) y del lado del servidor para las entradas del usuario.
- **Elementos de UI Responsivos**: Utiliza JavaScript del lado del cliente para actualizaciones dinámicas de la UI, incluyendo previsualizaciones de pósters y entradas de formulario condicionales.
- **Notificaciones**: Aprovecha SweetAlert2 para notificaciones y confirmaciones amigables para el usuario.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Bases de Datos**:
  - MongoDB con Mongoose (ODM) - Para datos de usuario y sesiones.
  - MySQL con Sequelize (ORM) - Para datos del catálogo de películas (películas, actores, géneros, etc.).
- **Autenticación**:
  - `bcryptjs`: Para hashear contraseñas de usuario.
  - `jose`: Para generación y verificación de JWT (autenticación API).
  - `express-session` & `connect-mongo`: Para gestión de sesiones en el monolito.
- **Motor de Plantillas**: EJS (Embedded JavaScript templates), `express-ejs-layouts` para soporte de layouts.
- **Subida de Archivos**:
  - `multer`: Middleware para manejar `multipart/form-data` (subida de archivos).
  - `multer-storage-cloudinary` & `cloudinary` SDK: Para subir imágenes directamente a Cloudinary.
- **Gestión de Entorno**: `dotenv` para cargar variables de entorno desde archivos `.env`.
- **Utilidades de Desarrollo**:
  - `nodemon`: Para reiniciar automáticamente el servidor durante el desarrollo.
  - `cross-env`: Para establecer variables de entorno en diferentes plataformas en los scripts de npm.
- **Middleware**:
  - `method-override`: Para usar verbos HTTP como PUT o DELETE en lugares donde el cliente no lo soporta.
- **Frontend**:
  - HTML, CSS
  - JavaScript (Módulos ES6 para utilidades, validación de formularios, interacciones dinámicas)
  - SweetAlert2: Para mensajes de alerta y confirmaciones ricas y personalizables.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (e.g., v18.x o una versión LTS compatible mencionada en `package.json` si se especifica)
- npm (Node Package Manager, usualmente viene con Node.js)
- Instancia del servidor MongoDB (corriendo y accesible)
- Instancia del servidor MySQL (corriendo y accesible)
- Una cuenta de Cloudinary (para obtener API Key, API Secret y Cloud Name para la subida de imágenes)

## Instalación

1.  **Clona el repositorio**:

    ```bash
    git clone <url-de-tu-repositorio>
    cd Programacion-Avanzada-II
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```
    Este comando instalará todas las dependencias listadas en `package.json`.

## Variables de Entorno

Este proyecto usa `dotenv` para gestionar variables de entorno. Necesitas crear dos archivos en la raíz del proyecto:

- `.env.development` (para desarrollo)
- `.env.production` (para producción)

Popula estos archivos con la configuración necesaria. La aplicación carga el archivo `.env` apropiado basándose en la variable de entorno `NODE_ENV`.

Aquí tienes una plantilla para el contenido de estos archivos:

```dotenv
# .env.development o .env.production

# Configuración del Servidor
PORT=3000

# Conexión MongoDB (para Usuarios y Sesiones)
MONGO_URI=mongodb://localhost:27017/programacion_avanzada_db # Reemplaza con tu cadena de conexión de MongoDB y nombre de base de datos

# Conexión MySQL (Sequelize para Catálogo de Películas)
DB_NAME=tu_nombre_de_base_de_datos_mysql
DB_USER=tu_usuario_mysql
DB_PASS=tu_contraseña_mysql
DB_HOST=localhost
DB_PORT=3306

# Configuración JWT (para Autenticación API)
JWT_SECRET=tu_clave_jwt_super_secreta_aqui

# Configuración Express Session (para Autenticación Monolito)
SESSION_SECRET=tu_clave_de_sesion_super_secreta_aqui

# Configuración Cloudinary (para Subida de Imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name_de_cloudinary
CLOUDINARY_API_KEY=tu_api_key_de_cloudinary
CLOUDINARY_API_SECRET=tu_api_secret_de_cloudinary
```

**Nota**: Reemplaza los valores de marcador de posición con tus credenciales y detalles de configuración reales.

## Configuración de la Base de Datos

### MongoDB

Asegúrate de que tu instancia de MongoDB esté corriendo. Mongoose típicamente creará la colección `usuarios` (definida en `src/models/user.js`) automáticamente cuando la aplicación se inicie y se escriban datos por primera vez, siempre que la base de datos especificada exista o MongoDB esté configurado para crear bases de datos bajo demanda. Los datos de sesión se almacenarán en una colección gestionada por `connect-mongo`.

### MySQL

1.  Asegúrate de que tu servidor MySQL esté corriendo y accesible.
2.  Crea la base de datos especificada en la variable de entorno `DB_NAME`.
3.  La aplicación usa Sequelize para definir modelos para `actores`, `categorias`, `generos`, `peliculas`, `peliculastrailers`. Estas tablas necesitan ser creadas en tu base de datos MySQL.
    - **Nota Importante**: En la carpeta `docs/` del repositorio, encontrarás un archivo de volcado SQL (`dump.sql` o similar). Este archivo contiene los scripts necesarios para crear el esquema completo de la base de datos MySQL, incluyendo todas las tablas requeridas y sus relaciones, así como la vista `catalogo`. Puedes importar este archivo directamente en tu servidor MySQL para configurar la estructura de la base de datos rápidamente.
4.  El modelo `Catalog` (`src/models/catalog.js`) interactúa con una vista o tabla de base de datos llamada `catalogo`. Esta vista desnormaliza datos de otras tablas (películas, géneros, actores, categorías, tráilers) para facilitar las consultas del catálogo de películas. La creación de esta vista está incluida en el archivo de volcado SQL mencionado anteriormente.
    Si prefieres crear la vista manualmente, aquí tienes un ejemplo de su estructura (aunque se recomienda usar el `dump`):
    ```sql
    CREATE
        ALGORITHM = UNDEFINED
        SQL SECURITY DEFINER
    VIEW `trailerflix`.`catalogo` AS
        SELECT
            `pel`.`idPelicula` AS `id`,
            `pel`.`poster` AS `poster`,
            `pel`.`poster_id` AS `poster_id`,
            `pel`.`titulo` AS `titulo`,
            `pel`.`blocked` AS `blocked`,
            CONCAT('[',
                    GROUP_CONCAT(DISTINCT JSON_OBJECT('id',
                                `cat`.`idCategoria`,
                                'descripcion',
                                `cat`.`descripcion`)
                        SEPARATOR ','),
                    ']') AS `categoria`,
            `pel`.`resumen` AS `resumen`,
            `pel`.`cantidadTemporadas` AS `temporadas`,
            CONCAT('[',
                    GROUP_CONCAT(DISTINCT JSON_OBJECT('id',
                                `gen`.`idGenero`,
                                'descripcion',
                                `gen`.`descripcion`)
                        SEPARATOR ','),
                    ']') AS `generos`,
            CONCAT('[',
                    GROUP_CONCAT(DISTINCT JSON_OBJECT('id',
                                `act`.`idActor`,
                                'nombre',
                                `act`.`nombre`)
                        SEPARATOR ','),
                    ']') AS `reparto`,
            GROUP_CONCAT(DISTINCT IFNULL(`pelt`.`trailer`, 'N/A')
                SEPARATOR ',') AS `trailer`
        FROM
            ((((((`trailerflix`.`peliculas` `pel`
            LEFT JOIN `trailerflix`.`categorias` `cat` ON ((`cat`.`idCategoria` = `pel`.`idCategoria`)))
            LEFT JOIN `trailerflix`.`peliculasgeneros` `pelg` ON ((`pelg`.`idPelicula` = `pel`.`idPelicula`)))
            LEFT JOIN `trailerflix`.`generos` `gen` ON ((`gen`.`idGenero` = `pelg`.`idGenero`)))
            LEFT JOIN `trailerflix`.`peliculasrepartos` `pelr` ON ((`pelr`.`idPelicula` = `pel`.`idPelicula`)))
            LEFT JOIN `trailerflix`.`actores` `act` ON ((`act`.`idActor` = `pelr`.`idActor`)))
            LEFT JOIN `trailerflix`.`peliculastrailers` `pelt` ON ((`pelt`.`idPelicula` = `pel`.`idPelicula`)))
        GROUP BY `pel`.`idPelicula`
    ```

## Ejecutando la Aplicación

La aplicación proporciona scripts de npm para iniciar el servidor en diferentes entornos.

- **Modo de Desarrollo**:
  Este modo usa `nodemon` para reinicios automáticos del servidor cuando se detectan cambios en los archivos.

  ```bash
  npm run dev
  ```

  Esto establece `NODE_ENV=development`.

- **Modo de Producción**:
  ```bash
  npm start
  ```
  Esto establece `NODE_ENV=production`.

El servidor se iniciará, y podrás acceder a la aplicación en `http://localhost:PORT` (e.g., `http://localhost:3000` si `PORT=3000`).
La ruta base `/` redirige a `/auth/login`.

## Estructura del Proyecto

```
Programacion-Avanzada-II/
├── app.js                    # Punto de entrada principal de la aplicación
├── package.json              # Metadatos del proyecto y dependencias
├── package-lock.json         # Versiones exactas de las dependencias
├── nodemon.json              # Configuración de Nodemon
├── .env.development          # Variables de entorno de desarrollo (a ser creadas por el usuario)
├── .env.production           # Variables de entorno de producción (a ser creadas por el usuario)
├── public/                   # Activos estáticos (CSS, JS del lado del cliente)
│   ├── css/                  # Hojas de estilo
│   └── js/                   # Archivos JavaScript del lado del cliente
├── src/
│   ├── config/               # Archivos de configuración (MongoDB, Sequelize, Cloudinary)
│   ├── controllers/          # Manejadores de peticiones (lógica para rutas)
│   │   ├── api/              # Controladores para rutas API
│   │   └── monolith/         # Controladores para rutas del monolito (basadas en vistas)
│   ├── middlewares/          # Middlewares personalizados de Express (autenticación, manejo de errores, sesión, subida de archivos)
│   ├── models/               # Modelos de base de datos (Sequelize & Mongoose) y asociaciones
│   ├── repositories/         # Capa de Acceso a Datos para modelos Sequelize (interactúa con BD)
│   ├── routes/               # Definiciones de rutas para Express
│   │   ├── api/              # Rutas API
│   │   └── monolith/         # Rutas del monolito (basadas en vistas)
│   ├── services/             # Capa de lógica de negocio, llamada por los controladores
│   ├── utils/                # Funciones de utilidad (clase HttpError, helpers JWT, validadores)
│   └── views/                # Plantillas EJS para el monolito (estructura implícita por la configuración de Express y controladores)
│       ├── auth/             # Vistas relacionadas con autenticación (login.ejs, register.ejs - implícito)
│       ├── movies/           # Vistas relacionadas con películas (index.ejs, detail.ejs, create.ejs, edit.ejs - implícito)
│       └── layout.ejs        # Plantilla de layout principal (implícito por `app.set("layout", "./layout")`)
└── README.md                 # Este archivo de documentación
```

## Endpoints de la API

Todos los endpoints de la API están prefijados con `/api`.
Los endpoints bajo `/api/movies`, `/api/genres`, `/api/categories`, `/api/actors` requieren autenticación mediante token JWT Bearer.

**Nota Importante**: En la carpeta `docs/` del repositorio, encontrarás una **colección de Postman** (`TRAILERFLIX.postman_collection.json` o similar). Esta colección contiene ejemplos de todas las solicitudes a los endpoints de la API, preconfigurados para facilitar las pruebas. Deberás configurar las variables de entorno en Postman (como la URL base y el token JWT después de autenticarte) para usarla correctamente.

* **Autenticación (`/api/auth`)**
    * `POST /register`: Registrar un nuevo usuario. Devuelve un JWT.
    * `POST /login`: Iniciar sesión de un usuario existente. Devuelve un JWT.

* **Películas (`/api/movies`)**
    * `GET /`: Obtener una lista de todas las películas.
    * `GET /:id`: Obtener una película específica por su ID.
    * `POST /`: Crear una nueva película. Espera `multipart/form-data` incluyendo un archivo de imagen `poster`.
    * `PUT /:id`: Actualizar una película existente por ID. Espera `multipart/form-data` si se actualiza el `poster`.
    * `DELETE /:id`: Eliminar una película por ID.

* **Actores (`/api/actors`)**
    * `GET /`: Obtener una lista de todos los actores.

* **Géneros (`/api/genres`)**
    * `GET /`: Obtener una lista de todos los géneros.

* **Categorías (`/api/categories`)**
    * `GET /`: Obtener una lista de todas las categorías.

## Rutas del Monolito (Vistas)

Estas rutas renderizan vistas EJS. Las rutas bajo `/movies` requieren autenticación basada en sesión.

- **Autenticación (`/auth`)**

  - `GET /login`: Mostrar el formulario de inicio de sesión.
  - `POST /login`: Procesar credenciales de inicio de sesión.
  - `GET /register`: Mostrar el formulario de registro.
  - `POST /register`: Procesar detalles de registro.
  - `POST /logout`: Cerrar sesión del usuario actual y destruir la sesión.

- **Películas (`/movies`)**

  - `GET /`: Mostrar la lista de todas las películas (página de índice de películas).
  - `GET /create`: Mostrar el formulario para crear una nueva película.
  - `POST /`: Procesar la creación de una nueva película (maneja la subida de archivos para el póster).
  - `GET /:id`: Mostrar detalles de una película específica.
  - `GET /edit/:id`: Mostrar el formulario para editar una película existente.
  - `PUT /:id`: Procesar la actualización de una película existente (maneja la subida de archivos para el póster). Usa `method-override`.
  - `GET /delete/:id`: Procesar la eliminación de una película.
  - `GET /block/:id`: Alternar el estado de bloqueo de una película (Solo Admin).

- **Redirección Base**
  - `GET /`: Redirige a `/auth/login`.

## Licencia

ISC
