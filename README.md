
Veterinaria App - Backend

Backend de la aplicación de gestión de veterinaria, construido con NestJS, TypeORM y PostgreSQL. Permite manejar turnos, clientes, productos, notificaciones y pagos.

🛠 Tecnologías

NestJS - Framework Node.js para construir APIs escalables.

TypeScript - Para tipado estático y desarrollo más seguro.

TypeORM - ORM para manejar la base de datos PostgreSQL.

PostgreSQL - Base de datos relacional.

JWT - Autenticación basada en tokens.

Mercado Pago - Integración de pagos.

Websockets - Para notificaciones en tiempo real.

⚡ Funcionalidades

Gestión de clientes y sus datos.

Registro y control de turnos.

Manejo de productos, categorías y stock.

Sistema de notificaciones en tiempo real.

Integración con Mercado Pago para pagos online.

Roles y permisos de usuarios (Admin, Empleado, Cliente).

📦 Instalación

Clonar el repositorio:

git clone https://github.com/NicolasArtemio/apiv1-vet.git

Instalar dependencias:

cd apiv1-vet
npm install

Configurar variables de entorno creando un archivo .env en la raíz del proyecto:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=veterinaria
JWT_SECRET=tu_secreto
MERCADO_PAGO_TOKEN=tu_token
PORT=4000

Ejecutar migraciones de la base de datos:

npm run typeorm migration:run

Iniciar el servidor en modo desarrollo:

npm run start:dev

🚀 Endpoints principales

/api/v1/turnos - Gestión de turnos.

/api/v1/clientes - Gestión de clientes.

/api/v1/productos - Gestión de productos.

/api/v1/mascotas - Gestión de mascotas.

/api/v1/notificaciones - Enviar y recibir notificaciones.

/api/v1/pagos - Integración con Mercado Pago.

/auth - Login y registro de usuarios.

Los endpoints requieren autorización con JWT según el rol del usuario.



📄 Documentación

La documentación de la API se puede generar y consultar con Swagger (si está configurado en el proyecto):

http://localhost:4000/api/v1

🤝 Contribuciones

Hacer un fork del repositorio.

Crear una rama nueva (git checkout -b feature/nueva-funcionalidad).

Hacer commit de los cambios (git commit -am 'Agregar nueva funcionalidad').

Hacer push a la rama (git push origin feature/nueva-funcionalidad).

Crear un Pull Request.
