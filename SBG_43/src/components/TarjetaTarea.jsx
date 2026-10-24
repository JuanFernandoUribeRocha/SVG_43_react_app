import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useTareas } from "../context/TareasContext";
import { buscarCategoria } from "../data/opciones";

const aparecer = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Tarjeta = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: 4px 6px;
  border-left: 4px solid ${(props) => props.$color};
  border-radius: 4px;
  background-color: ${(props) => props.$fondo};
  font-size: 0.8rem;
  opacity: ${(props) => (props.$completada ? 0.6 : 1)};
  animation: ${aparecer} 0.3s ease;
  transition: opacity 0.3s ease;

  input {
    margin: 2px 0 0;
    flex-shrink: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

const Texto = styled(Link)`
  flex: 1;
  min-width: 0;
  color: var(--texto);
  text-decoration: ${(props) => (props.$completada ? "line-through" : "none")};
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }

  small {
    display: block;
    color: var(--texto);
  }
`;

function resumen(tarea) {
  switch (tarea.categoria) {
    case "estudio":
      return [tarea.tema, tarea.minutos && `${tarea.minutos} min`];
    case "entrenamiento":
      return [
        tarea.tipoEntrenamiento,
        tarea.minutos && `${tarea.minutos} min`,
        tarea.distancia && `${tarea.distancia} km`,
      ];
    case "alimentacion":
      return [tarea.cantidad && `${tarea.cantidad} ${tarea.unidad}`];
    default:
      return [];
  }
}

function TarjetaTarea({ tarea }) {
  const { alternarCompletada } = useTareas();
  const categoria = buscarCategoria(tarea.categoria);
  const detalle = resumen(tarea).filter(Boolean).join(" · ");

  return (
    <Tarjeta
      $color={categoria.color}
      $fondo={categoria.fondo}
      $completada={tarea.completada}
    >
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => alternarCompletada(tarea.id)}
        aria-label={`Marcar "${tarea.titulo}" como completada`}
      />
      <Texto to={`/tarea/${tarea.id}`} $completada={tarea.completada}>
        {tarea.hora && <strong>{tarea.hora} </strong>}
        {tarea.titulo}
        {detalle && <small>{detalle}</small>}
      </Texto>
    </Tarjeta>
  );
}

export default TarjetaTarea;
