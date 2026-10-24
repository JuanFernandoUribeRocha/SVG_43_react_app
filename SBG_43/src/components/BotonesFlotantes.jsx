import { Link } from "react-router-dom";
import styled from "styled-components";

const Grupo = styled.div`
  position: fixed;
  right: 16px;
  bottom: calc(var(--alto-frase) + 16px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Boton = styled(Link)`
  padding: 12px 18px;
  border-radius: 24px;
  background-color: ${(props) => props.$color};
  color: var(--texto-sobre-acento);
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.05);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

function BotonesFlotantes() {
  return (
    <Grupo>
      <Boton to="/nueva" $color="var(--acento)">
        + Nueva tarea
      </Boton>
      <Boton to="/nueva?categoria=alimentacion" $color="var(--verde)">
        + Registrar comida
      </Boton>
    </Grupo>
  );
}

export default BotonesFlotantes;
