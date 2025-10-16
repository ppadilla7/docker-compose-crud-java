# Empleados CRUD (Java + Spring Boot + PostgreSQL + Docker)

Aplicación de ejemplo que implementa un CRUD de empleados con API REST usando Spring Boot y PostgreSQL, empaquetada y desplegada con Docker y Docker Compose. Incluye una interfaz web sencilla para gestionar los empleados.

## Características
- API REST para crear, listar, actualizar y eliminar empleados.
- Persistencia con Spring Data JPA y PostgreSQL.
- Despliegue con Docker usando `Dockerfile` y `docker-compose.yml`.
- UI básica (HTML + JS) servida por Spring Boot en `/`.

## Prerrequisitos
- Docker Desktop (Windows/Mac/Linux)
- Opcional: Java 17 y Maven 3 si quieres ejecutar sin Docker

## Ejecutar con Docker Compose
1. Construir y levantar los servicios:
   ```bash
   docker-compose up -d --build
   ```
2. Acceso:
   - UI: `http://localhost:5003/` (puerto host 5003 mapeado al 8080 del contenedor)
   - API: `http://localhost:5003/api/empleados`

Si el puerto 5003 está ocupado en tu máquina, puedes cambiar el mapeo en `docker-compose.yml`:
```yaml
app:
  ports:
    - "<PUERTO_HOST>:8080"
```

## Endpoints principales
- `GET /api/empleados` — lista todos
- `GET /api/empleados/{id}` — obtiene por id
- `POST /api/empleados` — crea
- `PUT /api/empleados/{id}` — actualiza
- `DELETE /api/empleados/{id}` — elimina
- `GET /api/empleados/departamento/{departamento}` — filtra por departamento
- `GET /api/empleados/search?query=texto` — busca por nombre o apellido

### Ejemplos con curl
```bash
# Listar empleados
curl http://localhost:5003/api/empleados

# Crear empleado
curl -X POST http://localhost:5003/api/empleados \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Pedro",
    "apellido":"López",
    "email":"pedro.lopez@empresa.com",
    "salario":35000,
    "fechaContratacion":"2022-01-01",
    "departamento":"Ventas"
  }'

# Actualizar
curl -X PUT http://localhost:5003/api/empleados/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Pedro",
    "apellido":"López",
    "email":"pedro.lopez@empresa.com",
    "salario":36000,
    "fechaContratacion":"2022-01-01",
    "departamento":"Ventas"
  }'

# Eliminar
curl -X DELETE http://localhost:5003/api/empleados/1
```

## UI Web
- Página: `src/main/resources/static/index.html`
- Script: `src/main/resources/static/app.js`
- Abre `http://localhost:5003/` para ver el listado, crear, editar y eliminar empleados.

## Configuración de base de datos
- `application.properties` configura la conexión a PostgreSQL:
  ```properties
  spring.datasource.url=jdbc:postgresql://postgres:5432/empleados_db
  spring.datasource.username=postgres
  spring.datasource.password=postgres
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.defer-datasource-initialization=true
  spring.sql.init.mode=always
  ```
- En `docker-compose.yml`, el servicio `postgres` expone `empleados_db` y el servicio `app` se conecta mediante la red interna.

## Datos iniciales
- Archivo `src/main/resources/import.sql` contiene datos de ejemplo.
- Con la configuración anterior (`spring.sql.init.mode=always` y `spring.jpa.defer-datasource-initialization=true`), se ejecuta tras crear el esquema.
- Si quieres controlar explícitamente el archivo, puedes añadir:
  ```properties
  spring.sql.init.data-locations=classpath:import.sql
  spring.sql.init.continue-on-error=true
  ```
- Para evitar duplicados, puedes adaptar las sentencias con `ON CONFLICT (email) DO NOTHING` (si defines una restricción única por `email`).

## Desarrollo local (sin Docker)
```bash
# Compilar
mvn clean package

# Ejecutar
mvn spring-boot:run
# UI en http://localhost:8080/ y API en http://localhost:8080/api/empleados
```
Si el puerto 8080 está ocupado, cambia `server.port` en `application.properties`.

## Estructura del proyecto
```
├── Dockerfile
├── docker-compose.yml
├── pom.xml
├── src/
│   └── main/
│       ├── java/ (código fuente Spring Boot)
│       └── resources/
│           ├── application.properties
│           ├── import.sql
│           └── static/
│               ├── index.html
│               └── app.js
```

## Troubleshooting
- Ver logs de contenedores:
  ```bash
  docker logs empleados_app
  docker logs postgres_db
  ```
- DB no disponible: espera al `healthcheck` de PostgreSQL; `depends_on` asegura que la app arranque cuando la DB esté lista.
- Errores de validación: revisa los campos obligatorios (nombre, apellido, salario) y formatos (email, fecha).

## Licencia
Proyecto de ejemplo para uso educativo.