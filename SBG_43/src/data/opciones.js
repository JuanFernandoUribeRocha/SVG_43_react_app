export const CATEGORIAS = [
  { valor: "estudio", nombre: "Estudio", color: "#58a6ff", fondo: "#121d2f" },
  { valor: "entrenamiento", nombre: "Entrenamiento", color: "#f85149", fondo: "#2d1517" },
  { valor: "alimentacion", nombre: "Alimentación", color: "#3fb950", fondo: "#12261a" },
  { valor: "diligencia", nombre: "Diligencia", color: "#d29922", fondo: "#2b2111" },
];

export const TIPOS_ENTRENAMIENTO = ["Gimnasio", "Boxeo", "Caminata"];

export const TIEMPOS_COMIDA = ["Desayuno", "Colación", "Comida", "Cena"];

export const UNIDADES = ["g", "ml", "piezas", "tazas", "cucharadas", "porciones"];

export function buscarCategoria(valor) {
  return CATEGORIAS.find((c) => c.valor === valor) || CATEGORIAS[0];
}
