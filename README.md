## API de Usuarios y Autenticación con Roles (NestJS)

Esta API permite crear usuarios y validar la autenticación basada en roles mediante tokens JWT, sin necesidad de un endpoint de login tradicional.

### Crear Usuario

- **Endpoint:** `POST /users`
- **Descripción:** Crea un nuevo usuario en el sistema.
- **Body esperado:**

```json
{
  "username": "usuario1",
  "password": "contraseña123",
  "role": "admin"
}