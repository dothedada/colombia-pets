# Backend de Mascotas de Colombia

> **Requisitos:**
>
> - Node.js versión mínima: 16.x
> - Versión recomendada: 18.x o superior

Este es un backend Node.js para una aplicación web sobre mascotas en Colombia. Utiliza Express y lee datos simulados de archivos JSON locales en el directorio `/data`. No se utiliza base de datos.

## Endpoints

- `GET /departments` — Lista todos los departamentos
- `GET /departments/:id` — Obtiene información detallada de un departamento
- `GET /pets` — Lista todas las mascotas
- `GET /pets/:id` — Obtiene información de una mascota por su id
- `GET /pets-list?departmentId=&year=` — Información de mascotas para un departamento y año
- `GET /pets-group-by-year?departmentId=` — Información de mascotas para ese departamento agrupada por año
- `GET /pets-summary?year=` — Suma de información de mascotas para todos los departamentos en un año dado

## Documentación Swagger

La documentación interactiva de la API está disponible con Swagger en:

- [http://localhost:3000/docs](http://localhost:3000/docs)

Desde ahí puedes explorar y probar los endpoints directamente desde el navegador.

## Cómo ejecutar

1. Instala las dependencias (ya hecho si ves `node_modules`):

   ```sh
   npm install
   ```

2. Inicia el servidor:

   ```sh
   node index.js
   ```

3. El servidor estará disponible en <http://localhost:3000>

## Datos

- Todos los datos simulados están en la carpeta `/data` como archivos JSON.
- No se requiere base de datos.
