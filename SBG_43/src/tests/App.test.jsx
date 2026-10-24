import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { TareasProvider } from "../context/TareasContext";
import { fechaLarga, hoy } from "../utils/fechas";

function renderizarApp(ruta = "/") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <TareasProvider>
        <App />
      </TareasProvider>
    </MemoryRouter>
  );
}

function guardarTareas(tareas) {
  localStorage.setItem("sbg43-tareas", JSON.stringify(tareas));
}

const tareaBase = {
  categoria: "estudio",
  fecha: hoy(),
  hora: "",
  completada: false,
  notas: "",
};

test("crea una tarea desde el formulario y aparece en el calendario", async () => {
  const usuario = userEvent.setup();
  renderizarApp("/nueva");

  await usuario.type(screen.getByLabelText("Título"), "Repasar Playwright");
  await usuario.click(screen.getByRole("button", { name: "Guardar" }));

  expect(screen.getByRole("link", { name: /Repasar Playwright/ })).toBeInTheDocument();
  expect(localStorage.getItem("sbg43-tareas")).toContain("Repasar Playwright");
});

test("muestra un error si el título está vacío", async () => {
  const usuario = userEvent.setup();
  renderizarApp("/nueva");

  await usuario.click(screen.getByRole("button", { name: "Guardar" }));

  expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
});

test("al completar una tarea desaparece del filtro de pendientes", async () => {
  guardarTareas([
    { ...tareaBase, id: "1", titulo: "Ir al banco", categoria: "diligencia" },
    { ...tareaBase, id: "2", titulo: "Clase de boxeo", categoria: "entrenamiento" },
  ]);
  const usuario = userEvent.setup();
  renderizarApp("/");

  await usuario.click(screen.getByLabelText('Marcar "Ir al banco" como completada'));
  await usuario.click(screen.getByRole("button", { name: "Pendientes" }));

  expect(screen.queryByText("Ir al banco")).not.toBeInTheDocument();
  expect(screen.getByText("Clase de boxeo")).toBeInTheDocument();
});

test("registrar comida guarda alimento, porción y tiempo de comida", async () => {
  const usuario = userEvent.setup();
  renderizarApp("/nueva?categoria=alimentacion");

  await usuario.type(screen.getByLabelText("Alimento"), "Avena");
  await usuario.type(screen.getByLabelText("Cantidad"), "40");
  await usuario.selectOptions(screen.getByLabelText("Tiempo de comida"), "Desayuno");
  await usuario.click(screen.getByRole("button", { name: "Guardar" }));

  const guardadas = JSON.parse(localStorage.getItem("sbg43-tareas"));
  expect(guardadas[0]).toMatchObject({
    titulo: "Avena",
    categoria: "alimentacion",
    cantidad: "40",
    unidad: "g",
    tiempoComida: "Desayuno",
    completada: true,
  });
});

test("ordena las tareas del día por hora, incluyendo los grupos de comidas", () => {
  guardarTareas([
    { ...tareaBase, id: "1", titulo: "Estudiar Cypress", hora: "20:00" },
    { ...tareaBase, id: "2", titulo: "Boxeo", hora: "07:00", categoria: "entrenamiento" },
    {
      ...tareaBase,
      id: "3",
      titulo: "Avena",
      hora: "08:30",
      categoria: "alimentacion",
      tiempoComida: "Desayuno",
      cantidad: "40",
      unidad: "g",
    },
  ]);
  renderizarApp("/");

  const columnaHoy = screen.getByRole("region", { name: fechaLarga(hoy()) });
  const textos = within(columnaHoy)
    .getAllByRole("link")
    .map((enlace) => enlace.textContent);

  expect(textos.slice(0, 3)).toEqual([
    expect.stringContaining("Boxeo"),
    expect.stringContaining("Avena"),
    expect.stringContaining("Estudiar Cypress"),
  ]);
});
