import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TareasContext = createContext(null);

export function TareasProvider({ children }) {
  const [tareas, setTareas] = useLocalStorage("sbg43-tareas", []);
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");

  const agregarTarea = (datos) => {
    const nueva = { ...datos, id: Date.now().toString() };
    setTareas((prev) => [...prev, nueva]);
    return nueva;
  };

  const editarTarea = (id, datos) => {
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...datos } : t)));
  };

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const alternarCompletada = (id) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const buscarTarea = (id) => tareas.find((t) => t.id === id);

  return (
    <TareasContext.Provider
      value={{
        tareas,
        filtroEstado,
        filtroCategoria,
        agregarTarea,
        editarTarea,
        eliminarTarea,
        alternarCompletada,
        buscarTarea,
        setFiltroEstado,
        setFiltroCategoria,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
}

export function useTareas() {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error("useTareas debe usarse dentro de <TareasProvider>");
  }
  return context;
}
