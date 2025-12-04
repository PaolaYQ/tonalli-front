export interface RegisterTeacherRequest {
  username: string;
  password: string;
  name: string;
  rol: 'A' | 'M';
}
