// Las fechas se guardan como texto "AAAA-MM-DD" para evitar problemas de zona horaria

export function fechaATexto(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export function textoAFecha(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

export function hoy() {
  return fechaATexto(new Date());
}

export function horaActual() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
}

export function sumarDias(texto, cantidad) {
  const fecha = textoAFecha(texto);
  fecha.setDate(fecha.getDate() + cantidad);
  return fechaATexto(fecha);
}

export function lunesDeLaSemana(texto) {
  const fecha = textoAFecha(texto);
  // getDay() regresa 0 para domingo, por eso se trata aparte
  const diferencia = fecha.getDay() === 0 ? -6 : 1 - fecha.getDay();
  return sumarDias(texto, diferencia);
}

export function listaDeDias(inicio, cantidad) {
  const dias = [];
  for (let i = 0; i < cantidad; i++) {
    dias.push(sumarDias(inicio, i));
  }
  return dias;
}

export function nombreCortoDia(texto) {
  return textoAFecha(texto).toLocaleDateString("es-MX", { weekday: "short" });
}

export function numeroDia(texto) {
  return textoAFecha(texto).getDate();
}

export function mesYAnio(texto) {
  return textoAFecha(texto).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
}

export function fechaLarga(texto) {
  return textoAFecha(texto).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
