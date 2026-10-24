export function filtrarTareas(tareas, estado, categoria) {
  return tareas.filter((tarea) => {
    if (estado === "pendientes" && tarea.completada) return false;
    if (estado === "completadas" && !tarea.completada) return false;
    if (categoria !== "todas" && tarea.categoria !== categoria) return false;
    return true;
  });
}

// Ordena de la mañana a la noche. Lo que no tiene hora va primero,
// como "todo el día" en un calendario
export function ordenarPorHora(tareas) {
  return [...tareas].sort((a, b) => (a.hora || "").localeCompare(b.hora || ""));
}
