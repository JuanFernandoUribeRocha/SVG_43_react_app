# SBG 43

Aplicación de gestión de tareas para organizar mi rutina diaria: estudio (QA Automation journey), entrenamiento (gimnasio, boxeo y caminata), bitácora de alimentación con porciones y diligencias personales. Las tareas se muestran en una vista de calendario: 3 días en celular y la semana completa en escritorio.

Proyecto Final del curso React Nivel Avanzado.

## Tecnologías

- React + Vite
- React Router (rutas `/`, `/nueva` y `/tarea/:id`)
- Context API para el estado global
- styled-components para los estilos
- localStorage para guardar las tareas
- Vitest + React Testing Library para las pruebas
- API externa [DummyJSON Quotes](https://dummyjson.com/docs/quotes) para la frase del día

## Instalación

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Pruebas

```bash
npm test
```

## Uso

- **Calendario (`/`)**: muestra las tareas por día. Con los botones ‹ y › te mueves entre días, con "Hoy" regresas a la fecha actual y con el selector de fecha saltas a cualquier día.
- **Filtros**: todas, pendientes o completadas, y filtro por categoría.
- **Nueva tarea (`/nueva`)**: el formulario cambia según la categoría.
  - Estudio: tema y minutos.
  - Entrenamiento: tipo (gimnasio, boxeo o caminata), minutos y distancia en km para la caminata.
  - Alimentación: alimento, cantidad, unidad y tiempo de comida (desayuno, colación, comida o cena).
  - Diligencia: solo título, fecha, hora y notas.
- **Botones flotantes**: "Nueva tarea" (naranja) abre el formulario vacío y "Registrar comida" (verde) abre el formulario de alimentación con la fecha y hora actuales, ya marcada como "Ya lo comí", para registrarla justo después de comer.
- **Detalle (`/tarea/:id`)**: muestra toda la información de la tarea y permite completarla, editarla o eliminarla.

## Estructura

```
src/
  components/   Componentes reutilizables (Encabezado, Filtros, ColumnaDia, TarjetaTarea, FormularioTarea, FraseDelDia)
  context/      TareasContext con el estado global y sus acciones
  data/         Categorías, tipos de entrenamiento, tiempos de comida y unidades
  hooks/        useLocalStorage y useDiasVisibles
  pages/        Calendario, NuevaTarea y DetalleTarea
  tests/        Pruebas con Vitest + React Testing Library
  utils/        Funciones de fechas y de filtrado
```
