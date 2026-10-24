import styled from "styled-components";
import { useTareas } from "../context/TareasContext";
import { CATEGORIAS } from "../data/opciones";

const ESTADOS = [
  { valor: "todas", nombre: "Todas" },
  { valor: "pendientes", nombre: "Pendientes" },
  { valor: "completadas", nombre: "Completadas" },
];

const Barra = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const Grupo = styled.div`
  display: flex;
  border: 1px solid var(--borde);
  border-radius: 16px;
  overflow: hidden;
`;

const BotonEstado = styled.button`
  padding: 6px 12px;
  border: none;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  background-color: ${(props) => (props["aria-pressed"] ? "var(--acento)" : "var(--superficie)")};
  color: ${(props) => (props["aria-pressed"] ? "var(--texto-sobre-acento)" : "var(--texto)")};
  transition: background-color 0.2s ease;
`;

const Select = styled.select`
  padding: 6px 8px;
  border: 1px solid var(--borde);
  border-radius: 8px;
  font: inherit;
  font-size: 0.85rem;
`;

function Filtros() {
  const { filtroEstado, filtroCategoria, setFiltroEstado, setFiltroCategoria } =
    useTareas();

  return (
    <Barra>
      <Grupo role="group" aria-label="Filtrar por estado">
        {ESTADOS.map((estado) => (
          <BotonEstado
            key={estado.valor}
            type="button"
            aria-pressed={filtroEstado === estado.valor}
            onClick={() => setFiltroEstado(estado.valor)}
          >
            {estado.nombre}
          </BotonEstado>
        ))}
      </Grupo>
      <label htmlFor="filtro-categoria" className="solo-lectores">
        Filtrar por categoría
      </label>
      <Select
        id="filtro-categoria"
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      >
        <option value="todas">Todas las categorías</option>
        {CATEGORIAS.map((c) => (
          <option key={c.valor} value={c.valor}>
            {c.nombre}
          </option>
        ))}
      </Select>
    </Barra>
  );
}

export default Filtros;
