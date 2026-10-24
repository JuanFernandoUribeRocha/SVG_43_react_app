import { Link } from "react-router-dom";
import styled from "styled-components";
import TarjetaTarea from "./TarjetaTarea";
import { TIEMPOS_COMIDA } from "../data/opciones";
import { fechaLarga, hoy, nombreCortoDia, numeroDia } from "../utils/fechas";
import { ordenarPorHora } from "../utils/filtrarTareas";

const Columna = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 8px 4px;
  border-left: 1px solid var(--borde);

  &:first-child {
    border-left: none;
  }
`;

const Cabecera = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  font-size: 0.75rem;
  font-weight: normal;
  text-transform: uppercase;
  color: ${(props) => (props.$esHoy ? "var(--acento)" : "var(--texto-secundario)")};

  span {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font-size: 1.3rem;
    color: ${(props) => (props.$esHoy ? "var(--texto-sobre-acento)" : "var(--texto)")};
    background-color: ${(props) => (props.$esHoy ? "var(--acento)" : "transparent")};
  }
`;

const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TituloGrupo = styled.h3`
  margin: 4px 0 0;
  font-size: 0.7rem;
  color: var(--verde);
`;

const Agregar = styled(Link)`
  align-self: center;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: var(--acento);
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background-color: var(--superficie-alta);
  }
`;

function ColumnaDia({ fecha, tareas }) {
  const esHoy = fecha === hoy();
  const idTitulo = `dia-${fecha}`;

  const ordenadas = ordenarPorHora(tareas);
  const otras = ordenadas.filter((t) => t.categoria !== "alimentacion");
  const comidas = ordenadas.filter((t) => t.categoria === "alimentacion");

  // Cada tarea es un bloque y cada tiempo de comida es otro bloque
  // que toma la hora de su primera comida, así todo queda en orden por hora
  const bloques = otras.map((tarea) => ({ clave: tarea.id, hora: tarea.hora, tarea }));
  TIEMPOS_COMIDA.forEach((tiempo) => {
    const delTiempo = comidas.filter((c) => c.tiempoComida === tiempo);
    if (delTiempo.length > 0) {
      bloques.push({ clave: tiempo, hora: delTiempo[0].hora, tiempo, comidas: delTiempo });
    }
  });

  return (
    <Columna aria-labelledby={idTitulo}>
      <Cabecera id={idTitulo} $esHoy={esHoy} aria-label={fechaLarga(fecha)}>
        {nombreCortoDia(fecha)}
        <span>{numeroDia(fecha)}</span>
      </Cabecera>

      <Lista>
        {ordenarPorHora(bloques).map((bloque) =>
          bloque.tarea ? (
            <TarjetaTarea key={bloque.clave} tarea={bloque.tarea} />
          ) : (
            <li key={bloque.clave}>
              <TituloGrupo>{bloque.tiempo}</TituloGrupo>
              <Lista>
                {bloque.comidas.map((tarea) => (
                  <TarjetaTarea key={tarea.id} tarea={tarea} />
                ))}
              </Lista>
            </li>
          )
        )}
      </Lista>

      <Agregar to={`/nueva?fecha=${fecha}`} aria-label={`Agregar tarea el ${fechaLarga(fecha)}`}>
        + Agregar
      </Agregar>
    </Columna>
  );
}

export default ColumnaDia;
