import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import BotonesFlotantes from "./components/BotonesFlotantes";
import Encabezado from "./components/Encabezado";
import FraseDelDia from "./components/FraseDelDia";
import Calendario from "./pages/Calendario";
import DetalleTarea from "./pages/DetalleTarea";
import NuevaTarea from "./pages/NuevaTarea";

const Principal = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 16px 140px;

  @media (min-width: 768px) {
    padding-bottom: calc(var(--alto-frase) + 88px);
  }
`;

function App() {
  return (
    <>
      <Encabezado />
      <FraseDelDia />
      <Principal>
        <Routes>
          <Route path="/" element={<Calendario />} />
          <Route path="/nueva" element={<NuevaTarea />} />
          <Route path="/tarea/:id" element={<DetalleTarea />} />
          <Route
            path="*"
            element={
              <>
                <h1>Página no encontrada</h1>
                <Link to="/">Volver al calendario</Link>
              </>
            }
          />
        </Routes>
      </Principal>
      <BotonesFlotantes />
    </>
  );
}

export default App;
