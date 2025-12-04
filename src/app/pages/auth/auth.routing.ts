import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register-teacher/register-teacher.component'),
  },
  {
    path: 'join',
    loadComponent: () =>
      import('./register-student/register-student.component'),
  },
];
