export interface Attemp {
  estrellasGanadas: number;
  estrellasTotalesActividad: number;
  medallaGanada: boolean;
  actividadCompletada: boolean;
  mensaje: string;
}

export interface SubmitAttemptRequest {
  idAsignacion: number;
  resultadoPorcentaje: number;
  duracionSegundos: number;
}
