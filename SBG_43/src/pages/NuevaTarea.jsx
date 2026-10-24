import { useNavigate, useSearchParams } from "react-router-dom";
import FormularioTarea from "../components/FormularioTarea";
import { useTareas } from "../context/TareasContext";
import { horaActual, hoy } from "../utils/fechas";

function tiempoSegunHora(hora) {
  if (hora < "11:00") return "Desayuno";
  if (hora < "14:00") return "Colación";
  if (hora < "18:00") return "Comida";
  return "Cena";
}

function NuevaTarea() {
  const { agregarTarea } = useTareas();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const categoria = params.get("categoria") || "estudio";
  const esComida = categoria === "alimentacion";
  const hora = esComida ? horaActual() : "";

  // Una comida se registra justo despues de comer, por eso ya viene completada y con la hora actual
  const valoresIniciales = {
    titulo: "",
    categoria,
    fecha: params.get("fecha") || hoy(),
    hora,
    completada: esComida,
    notas: "",
    tema: "",
    minutos: "",
    tipoEntrenamiento: "Gimnasio",
    distancia: "",
    tiempoComida: esComida ? tiempoSegunHora(hora) : "Desayuno",
    cantidad: "",
    unidad: "g",
  };

  const guardar = (datos) => {
    agregarTarea(datos);
    navigate("/");
  };

  return (
    <>
      <h1>{esComida ? "Registrar comida" : "Nueva tarea"}</h1>
      <FormularioTarea
        key={categoria + valoresIniciales.fecha}
        valoresIniciales={valoresIniciales}
        onGuardar={guardar}
        textoBoton="Guardar"
      />
    </>
  );
}

export default NuevaTarea;
