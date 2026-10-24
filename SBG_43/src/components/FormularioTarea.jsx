import { useState } from "react";
import styled from "styled-components";
import {
  CATEGORIAS,
  TIEMPOS_COMIDA,
  TIPOS_ENTRENAMIENTO,
  UNIDADES,
} from "../data/opciones";

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 480px;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-weight: bold;
    font-size: 0.9rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--borde-campo);
    border-radius: 6px;
    font: inherit;
  }
`;

const Fila = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

const Casilla = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Error = styled.span`
  color: var(--peligro);
  font-size: 0.85rem;
`;

const BotonGuardar = styled.button`
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: var(--acento);
  color: var(--texto-sobre-acento);
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--acento-oscuro);
  }
`;

function validar(datos) {
  const errores = {};
  if (!datos.titulo.trim()) {
    errores.titulo =
      datos.categoria === "alimentacion"
        ? "Escribe qué alimento comiste"
        : "El título es obligatorio";
  }
  if (!datos.fecha) {
    errores.fecha = "La fecha es obligatoria";
  }
  if (datos.categoria === "alimentacion" && !(Number(datos.cantidad) > 0)) {
    errores.cantidad = "Escribe una cantidad mayor a 0";
  }
  return errores;
}

function FormularioTarea({ valoresIniciales, onGuardar, textoBoton }) {
  const [datos, setDatos] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(datos);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length === 0) {
      onGuardar({ ...datos, titulo: datos.titulo.trim() });
    }
  };

  const esComida = datos.categoria === "alimentacion";

  return (
    <Formulario onSubmit={handleSubmit} noValidate>
      <Campo>
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" name="categoria" value={datos.categoria} onChange={handleChange}>
          {CATEGORIAS.map((c) => (
            <option key={c.valor} value={c.valor}>
              {c.nombre}
            </option>
          ))}
        </select>
      </Campo>

      <Campo>
        <label htmlFor="titulo">{esComida ? "Alimento" : "Título"}</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={datos.titulo}
          onChange={handleChange}
          aria-invalid={Boolean(errores.titulo)}
          aria-describedby={errores.titulo ? "error-titulo" : undefined}
        />
        {errores.titulo && <Error id="error-titulo">{errores.titulo}</Error>}
      </Campo>

      <Fila>
        <Campo>
          <label htmlFor="fecha">Fecha</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={datos.fecha}
            onChange={handleChange}
            aria-invalid={Boolean(errores.fecha)}
            aria-describedby={errores.fecha ? "error-fecha" : undefined}
          />
          {errores.fecha && <Error id="error-fecha">{errores.fecha}</Error>}
        </Campo>
        <Campo>
          <label htmlFor="hora">Hora (opcional)</label>
          <input id="hora" name="hora" type="time" value={datos.hora} onChange={handleChange} />
        </Campo>
      </Fila>

      {datos.categoria === "estudio" && (
        <Fila>
          <Campo>
            <label htmlFor="tema">Tema</label>
            <input
              id="tema"
              name="tema"
              type="text"
              placeholder="Ej. Promesas en JavaScript"
              value={datos.tema}
              onChange={handleChange}
            />
          </Campo>
          <Campo>
            <label htmlFor="minutos">Minutos</label>
            <input id="minutos" name="minutos" type="number" min="0" value={datos.minutos} onChange={handleChange} />
          </Campo>
        </Fila>
      )}

      {datos.categoria === "entrenamiento" && (
        <>
          <Fila>
            <Campo>
              <label htmlFor="tipoEntrenamiento">Tipo</label>
              <select
                id="tipoEntrenamiento"
                name="tipoEntrenamiento"
                value={datos.tipoEntrenamiento}
                onChange={handleChange}
              >
                {TIPOS_ENTRENAMIENTO.map((tipo) => (
                  <option key={tipo}>{tipo}</option>
                ))}
              </select>
            </Campo>
            <Campo>
              <label htmlFor="minutos">Minutos</label>
              <input id="minutos" name="minutos" type="number" min="0" value={datos.minutos} onChange={handleChange} />
            </Campo>
          </Fila>
          {datos.tipoEntrenamiento === "Caminata" && (
            <Campo>
              <label htmlFor="distancia">Distancia (km)</label>
              <input
                id="distancia"
                name="distancia"
                type="number"
                min="0"
                step="0.1"
                value={datos.distancia}
                onChange={handleChange}
              />
            </Campo>
          )}
        </>
      )}

      {esComida && (
        <>
          <Campo>
            <label htmlFor="tiempoComida">Tiempo de comida</label>
            <select id="tiempoComida" name="tiempoComida" value={datos.tiempoComida} onChange={handleChange}>
              {TIEMPOS_COMIDA.map((tiempo) => (
                <option key={tiempo}>{tiempo}</option>
              ))}
            </select>
          </Campo>
          <Fila>
            <Campo>
              <label htmlFor="cantidad">Cantidad</label>
              <input
                id="cantidad"
                name="cantidad"
                type="number"
                min="0"
                step="any"
                value={datos.cantidad}
                onChange={handleChange}
                aria-invalid={Boolean(errores.cantidad)}
                aria-describedby={errores.cantidad ? "error-cantidad" : undefined}
              />
              {errores.cantidad && <Error id="error-cantidad">{errores.cantidad}</Error>}
            </Campo>
            <Campo>
              <label htmlFor="unidad">Unidad</label>
              <select id="unidad" name="unidad" value={datos.unidad} onChange={handleChange}>
                {UNIDADES.map((unidad) => (
                  <option key={unidad}>{unidad}</option>
                ))}
              </select>
            </Campo>
          </Fila>
        </>
      )}

      <Campo>
        <label htmlFor="notas">Notas (opcional)</label>
        <textarea id="notas" name="notas" rows="3" value={datos.notas} onChange={handleChange} />
      </Campo>

      <Casilla>
        <input type="checkbox" name="completada" checked={datos.completada} onChange={handleChange} />
        {esComida ? "Ya lo comí" : "Completada"}
      </Casilla>

      <BotonGuardar type="submit">{textoBoton}</BotonGuardar>
    </Formulario>
  );
}

export default FormularioTarea;
