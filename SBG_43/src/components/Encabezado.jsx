import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  padding: 12px 16px;
  border-bottom: 1px solid var(--borde);
  background-color: var(--superficie);
`;

const Marca = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  font-weight: 800;
  color: var(--acento);
  text-decoration: none;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

function Encabezado() {
  return (
    <Header>
      <Marca to="/">
        <span aria-hidden="true">🦍</span>
        SBG 43
      </Marca>
    </Header>
  );
}

export default Encabezado;
