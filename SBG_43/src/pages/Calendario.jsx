import { useState } from "react";
import styled from "styled-components";
import ColumnaDia from "../components/ColumnaDia";
import Filtros from "../components/Filtros";
import { useTareas } from "../context/TareasContext";
import { useDiasVisibles } from "../hooks/useDiasVisibles";
import { filtrarTareas } from "../utils/filtrarTareas";
import { hoy, listaDeDias, lunesDeLaSemana, mesYAnio, sumarDias } from "../utils/fechas";

const Controles = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

const Navegacion = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;

  h1 {
    width: 100%;
    margin: 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  h1::first-letter {
    text-transform: uppercase;
  }

  @media (min-width: 768px) {
    h1 {
      width: auto;
      margin-right: 8px;
    }
  }
`;

const Boton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--borde);
  border-radius: 18px;
  background-color: var(--superficie);
  font: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--superficie-alta);
  }
`;

const SelectorFecha = styled.input`
  height: 36px;
  padding: 0 8px;
  border: 1px solid var(--borde);
  border-radius: 18px;
  font: inherit;
`;

const Rejilla = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$dias}, 1fr);
  min-height: 60vh;
  border: 1px solid var(--borde);
  border-radius: 8px;
  background-color: var(--superficie);
`;


function Calendario() {
  const { tareas, filtroEstado, filtroCategoria } = useTareas();
  const diasVisibles = useDiasVisibles();
  const [fechaBase, setFechaBase] = useState(hoy());

  // En escritorio la semana empieza en lunes, en celular empieza en la fecha elegida
  const inicio = diasVisibles === 7 ? lunesDeLaSemana(fechaBase) : fechaBase;
  const dias = listaDeDias(inicio, diasVisibles);
  const visibles = filtrarTareas(tareas, filtroEstado, filtroCategoria);

  return (
    <>
      <Controles>
        <Navegacion>
          <h1>{mesYAnio(inicio)}</h1>
          <Boton type="button" onClick={() => setFechaBase(hoy())}>
            Hoy
          </Boton>
          <Boton
            type="button"
            aria-label="Días anteriores"
            onClick={() => setFechaBase(sumarDias(fechaBase, -diasVisibles))}
          >
            ‹
          </Boton>
          <Boton
            type="button"
            aria-label="Días siguientes"
            onClick={() => setFechaBase(sumarDias(fechaBase, diasVisibles))}
          >
            ›
          </Boton>
          <label htmlFor="ir-a-fecha" className="solo-lectores">
            Ir a la fecha
          </label>
          <SelectorFecha
            id="ir-a-fecha"
            type="date"
            value={fechaBase}
            onChange={(e) => e.target.value && setFechaBase(e.target.value)}
          />
        </Navegacion>
        <Filtros />
      </Controles>

      <Rejilla $dias={diasVisibles}>
        {dias.map((fecha) => (
          <ColumnaDia
            key={fecha}
            fecha={fecha}
            tareas={visibles.filter((t) => t.fecha === fecha)}
          />
        ))}
      </Rejilla>

    </>
  );
}

export default Calendario;
