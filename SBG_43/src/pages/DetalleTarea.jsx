import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FormularioTarea from "../components/FormularioTarea";
import { useTareas } from "../context/TareasContext";
import { buscarCategoria } from "../data/opciones";
import { fechaLarga } from "../utils/fechas";

const Etiqueta = styled.span`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$fondo};
`;

const Datos = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 8px 16px;

  dt {
    font-weight: bold;
    color: var(--texto-secundario);
  }

  dd {
    margin: 0;
  }
`;

const Acciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const Boton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${(props) => (props.$peligro ? "var(--peligro)" : "var(--borde)")};
  border-radius: 6px;
  background-color: var(--superficie);
  color: ${(props) => (props.$peligro ? "var(--peligro)" : "var(--texto)")};
  font: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$peligro ? "var(--peligro-fondo)" : "var(--superficie-alta)")};
  }
`;

function DetalleTarea() {
  const { id } = useParams();
  const { buscarTarea, editarTarea, eliminarTarea, alternarCompletada } = useTareas();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);

  const tarea = buscarTarea(id);

  if (!tarea) {
    return (
      <>
        <h1>Tarea no encontrada</h1>
        <Link to="/">Volver al calendario</Link>
      </>
    );
  }

  const categoria = buscarCategoria(tarea.categoria);

  const guardarCambios = (datos) => {
    editarTarea(id, datos);
    setEditando(false);
  };

  const borrar = () => {
    if (window.confirm(`¿Eliminar "${tarea.titulo}"?`)) {
      eliminarTarea(id);
      navigate("/");
    }
  };

  if (editando) {
    return (
      <>
        <h1>Editar tarea</h1>
        <FormularioTarea valoresIniciales={tarea} onGuardar={guardarCambios} textoBoton="Guardar cambios" />
        <Acciones>
          <Boton type="button" onClick={() => setEditando(false)}>
            Cancelar
          </Boton>
        </Acciones>
      </>
    );
  }

  return (
    <>
      <Link to="/">← Volver al calendario</Link>
      <h1>{tarea.titulo}</h1>
      <Etiqueta $color={categoria.color} $fondo={categoria.fondo}>
        {categoria.nombre}
      </Etiqueta>

      <Datos>
        <dt>Fecha</dt>
        <dd>{fechaLarga(tarea.fecha)}</dd>
        {tarea.hora && (
          <>
            <dt>Hora</dt>
            <dd>{tarea.hora}</dd>
          </>
        )}
        <dt>Estado</dt>
        <dd>{tarea.completada ? "Completada" : "Pendiente"}</dd>

        {tarea.categoria === "estudio" && tarea.tema && (
          <>
            <dt>Tema</dt>
            <dd>{tarea.tema}</dd>
          </>
        )}
        {tarea.categoria === "entrenamiento" && (
          <>
            <dt>Tipo</dt>
            <dd>{tarea.tipoEntrenamiento}</dd>
          </>
        )}
        {tarea.categoria === "entrenamiento" && tarea.distancia && (
          <>
            <dt>Distancia</dt>
            <dd>{tarea.distancia} km</dd>
          </>
        )}
        {(tarea.categoria === "estudio" || tarea.categoria === "entrenamiento") &&
          tarea.minutos && (
            <>
              <dt>Duración</dt>
              <dd>{tarea.minutos} min</dd>
            </>
          )}
        {tarea.categoria === "alimentacion" && (
          <>
            <dt>Tiempo</dt>
            <dd>{tarea.tiempoComida}</dd>
            <dt>Porción</dt>
            <dd>
              {tarea.cantidad} {tarea.unidad}
            </dd>
          </>
        )}
        {tarea.notas && (
          <>
            <dt>Notas</dt>
            <dd>{tarea.notas}</dd>
          </>
        )}
      </Datos>

      <Acciones>
        <Boton type="button" onClick={() => alternarCompletada(id)}>
          {tarea.completada ? "Marcar como pendiente" : "Marcar como completada"}
        </Boton>
        <Boton type="button" onClick={() => setEditando(true)}>
          Editar
        </Boton>
        <Boton type="button" $peligro onClick={borrar}>
          Eliminar
        </Boton>
      </Acciones>
    </>
  );
}

export default DetalleTarea;
