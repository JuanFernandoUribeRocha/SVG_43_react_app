import { useEffect, useState } from "react";
import styled from "styled-components";

const API_FRASES = "https://dummyjson.com/quotes/random";

// Si la API falla se muestra una frase local
const FRASE_RESPALDO = {
  quote: "La disciplina es el puente entre las metas y los logros.",
  author: "Jim Rohn",
};

const Contenedor = styled.figure`
  margin: 16px 16px 0;
  padding: 14px 16px;
  border-left: 4px solid var(--acento);
  border-radius: 8px;
  background-color: var(--superficie);
  color: var(--texto);

  blockquote {
    margin: 0;
    font-size: 1.15rem;
    font-style: italic;
  }

  figcaption {
    margin-top: 6px;
    color: var(--acento);
    font-weight: bold;
  }

  /* En escritorio la frase queda fija en la parte baja de la pantalla */
  @media (min-width: 768px) {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: var(--alto-frase);
    margin: 0;
    padding: 0 32px;
    border-left: none;
    border-top: 3px solid var(--acento);
    border-radius: 0;

    blockquote {
      font-size: 1.35rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;

function FraseDelDia() {
  const [frase, setFrase] = useState(null);

  useEffect(() => {
    const cargarFrase = async () => {
      try {
        const res = await fetch(API_FRASES);
        if (!res.ok) throw new Error("No se pudo cargar la frase");
        const datos = await res.json();
        setFrase(datos);
      } catch {
        setFrase(FRASE_RESPALDO);
      }
    };
    cargarFrase();
  }, []);

  if (!frase) {
    return <Contenedor aria-live="polite">Cargando frase del día...</Contenedor>;
  }

  return (
    <Contenedor aria-live="polite">
      <blockquote>"{frase.quote}"</blockquote>
      <figcaption>{frase.author}</figcaption>
    </Contenedor>
  );
}

export default FraseDelDia;
