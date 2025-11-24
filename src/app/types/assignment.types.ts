import { AssignmentService } from '../services/assignment.service';

export interface AssignmentRequest {
  idActividad: number;
  codigoClase: string;
  fechaLimite: string;
}

export interface AssigmentDialogData {
  idActividad: number;
  codigoClase: string;
  title: string;
}

export interface AssignmentResponse {
  mensaje: string;
  idAsignacion: number;
}

export interface AssignmentsList {
  pendientes: Assignment[];
  vencidas: Assignment[];
  completadas: Assignment[];
}

export interface Assignment {
  idAsignacion: number;
  idActividad: number;
  titulo: string;
  descripcion: string;
  tema: string;
  fechaLimite: Date;
}


