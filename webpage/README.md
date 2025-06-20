# Frontend de Departamentos de Colombia

> **Requisitos:**
>
> - Node.js versión mínima: 16.x
> - Versión recomendada: 18.x o superior

Este es un frontend en React para una aplicación web sobre departamentos y mascotas en Colombia. Utiliza React y CSS puro, sin bibliotecas de UI de terceros, y consume datos de un backend en Express.

## Características

- Menú desplegable para seleccionar un departamento de Colombia.
- Mapa SVG interactivo de Colombia con enfoque y zoom en departamentos.
- Panel de información del departamento (nombre, capital, municipios, etc.).
- Estadísticas a nivel país y por departamento, incluyendo información de mascotas.
- Gráfico dinámico de estadísticas para el departamento seleccionado.
- Filtros por año y departamento.
- Diseño responsivo y minimalista usando solo React y CSS.
- Consumo de datos desde un backend Express vía endpoints REST.
- Código modular con componentes reutilizables (mapa, dropdowns, info, gráficos, encabezado).

## Cómo ejecutar

1. Instala las dependencias:

   ```sh
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```sh
   npm start
   ```

3. Abre tu navegador y ve a [http://localhost:5173](http://localhost:5173) para ver la aplicación.

## Datos

- Los datos se obtienen desde el backend Express (ver carpeta `/server`).

## Documentación Backend

- La documentación Swagger de la API está disponible en [http://localhost:3000/docs](http://localhost:3000/docs)
