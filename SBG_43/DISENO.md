# Documento de diseño: SBG 43

## 1. Objetivo

Tener en un solo lugar las actividades de mi día: estudio, entrenamiento, alimentación y diligencias. La app es un gestor de tareas en el que cada tarea pertenece a una categoría, y las tareas se ven en un calendario por días, parecido a Google Calendar.

Se usa principalmente en el celular, por eso el diseño es mobile first.
|

### Boceto del calendario

- En celular la vista empieza en la fecha elegida y se mueve de 3 en 3 días.
- En escritorio se muestra la semana de lunes a domingo y se mueve de semana en semana.
- Dentro de cada día las tareas van ordenadas por hora, de la mañana a la noche. Las tareas sin hora van primero. Las comidas se agrupan por tiempo (desayuno, colación, comida, cena) y cada grupo se acomoda según la hora de su primera comida.
- La frase del día va debajo del título en celular y fija en la parte baja de la pantalla en escritorio.

## 2. Modelo de datos

Todas las tareas comparten los mismos campos base, y cada categoría usa algunos campos extra:

Campo | Tipo | Uso

---

`id` | texto | Identificador (`Date.now()`)  
 `titulo` | texto | Título de la tarea o nombre del alimento  
 `categoria` | texto | `estudio`, `entrenamiento`, `alimentacion` o `diligencia`
`fecha` | texto `AAAA-MM-DD` | Día de la tarea  
 `hora` | texto `HH:MM` | Opcional  
 `completada` | booleano | Estado  
 `notas` | texto | Opcional  
 `tema`, `minutos` | texto, número | Estudio  
 `tipoEntrenamiento`, `minutos`, `distancia` | texto, número, número | Entrenamiento (distancia solo en caminata)  
 `tiempoComida`, `cantidad`, `unidad` | texto, número, texto | Alimentación

## 3. Paleta de colores

Tema oscuro con naranja como color principal. Los colores están definidos como variables CSS en `index.css` (`--fondo`, `--acento`, etc.) para cambiarlos en un solo lugar.

Uso | Color

---

Fondo de la página | `#0d1117`  
 Superficies (encabezado, calendario, campos) | `#161b22`  
 Superficie al pasar el mouse | `#21262d`  
 Bordes | `#30363d`  
 Texto | `#e6edf3`  
 Texto secundario | `#8b949e`  
 Principal (naranja: título, hoy, botones, enlaces) | `#f0883e`  
 Texto sobre naranja o verde | `#0d1117`  
 Estudio | borde `#58a6ff`, fondo `#121d2f`
Entrenamiento | borde `#f85149`, fondo `#2d1517`
Alimentación | borde `#3fb950`, fondo `#12261a`
Diligencia | borde `#d29922`, fondo `#2b2111`

El texto de las tarjetas es claro sobre fondos oscuros, y en los botones naranja y verde el texto es oscuro, para mantener buen contraste.

## 4. Estructura de componentes

```
main.jsx
└─ BrowserRouter
   └─ TareasProvider (Context API + localStorage)
      └─ App
         ├─ Encabezado (título con icono de gorila)
         ├─ FraseDelDia (API externa)
         ├─ Routes
         │  ├─ Calendario
         │  │  ├─ Filtros
         │  │  └─ ColumnaDia (una por día)
         │  │     └─ TarjetaTarea
         │  ├─ NuevaTarea
         │  │  └─ FormularioTarea
         │  └─ DetalleTarea
         │     └─ FormularioTarea (al editar)
         └─ BotonesFlotantes (Nueva tarea y Registrar comida)
```

## 5. Estado global

`TareasContext` guarda:

- `tareas`, que se sincroniza con localStorage mediante el hook `useLocalStorage`.
- `filtroEstado` y `filtroCategoria`, para que los filtros se mantengan al ir al detalle y regresar.

Acciones: `agregarTarea`, `editarTarea`, `eliminarTarea`, `alternarCompletada` y `buscarTarea`. Los componentes las usan con el hook `useTareas()`.

## 6. Hooks personalizados

- `useLocalStorage(clave, valorInicial)`: funciona como `useState` pero lee y guarda el valor en localStorage.
- `useDiasVisibles()`: regresa 3 o 7 según el ancho de la pantalla y se actualiza al cambiar el tamaño de la ventana.

## 7. Estilos, transición y accesibilidad

- Estilos encapsulados con styled-components.
- Transición: las tarjetas aparecen con una animación corta y cambian de opacidad al completarse. Se desactiva si el sistema tiene activado "reducir movimiento".
- Accesibilidad: todos los campos tienen `label` asociado, los errores se ligan con `aria-describedby`, los filtros usan `aria-pressed`, los botones de solo icono tienen `aria-label`, hay contorno visible con el teclado y el idioma de la página es español.

## 8. Pruebas

1. Crear una tarea desde el formulario y verla en el calendario.
2. Mostrar un error si el título está vacío.
3. Completar una tarea y verificar que desaparece del filtro de pendientes.
4. Registrar una comida con alimento, porción y tiempo de comida.
5. Ordenar las tareas del día por hora, incluyendo los grupos de comidas.
