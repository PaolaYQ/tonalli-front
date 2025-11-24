export interface ActivityResponse {
  idActividad: number;
  titulo: string;
  descripcion: string;
  tema: string;
  asignada: boolean;
}
export interface Activity {
  idAsignacion: number;
  tituloActividad: string;
  descripcion: string;
  fechaLimite: Date;
  preguntas: Question[];
}

export interface Question {
  idPregunta: number;
  enunciado: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  opcionD: string;
  respuestaCorrecta: string;
}
