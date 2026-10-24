import { useEffect, useState } from "react";

const ANCHO_ESCRITORIO = 768;

function calcularDias() {
  return window.innerWidth >= ANCHO_ESCRITORIO ? 7 : 3;
}

// En celular se ven 3 días y en escritorio la semana completa
export function useDiasVisibles() {
  const [dias, setDias] = useState(calcularDias);

  useEffect(() => {
    const alCambiarTamano = () => setDias(calcularDias());
    window.addEventListener("resize", alCambiarTamano);
    return () => window.removeEventListener("resize", alCambiarTamano);
  }, []);

  return dias;
}
