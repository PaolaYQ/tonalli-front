import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { appGuard } from './guards/app.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.component'),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routing').then((r) => r.routes),
    canActivate: [authGuard],
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('./pages/teacher/teacher.routing').then((r) => r.routes),
    canActivate: [appGuard],
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./pages/student/student.routing').then((r) => r.routes),
    canActivate: [appGuard],
  },
];
