export interface ClassCard {
  idClase: number;
  nombreClase: string;
  grado: number;
  codigoClase: string;
  totalAlumnos: number;
}

export interface AddClassForm {
  nombreClase: string;
  grado: number | null;
}

export interface CodeClass {
  codigoClase: string;
}

export interface ClassInfo {
  nombreClase: string;
  codigoClase: string;
  grado: number;
  totalAlumnos: number;
}
