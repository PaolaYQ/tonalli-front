import { Medal } from './medal.types';

export interface StudentInfo {
  idAlumno: string;
  nombre: string;
  avatarUrl: string | null;
  estrellas: number;
}

export interface ProfileStudentDetail {
  nombre: string;
  correo: string;
  avatarUrl: string | null;
  estrellasTotales: number;
  estrellasDisponibles: number;
  medallas: Medal[];
}
