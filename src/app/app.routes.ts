import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.component'),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routing').then((r) => r.routes),
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('./pages/teacher/teacher.routing').then((r) => r.routes),
  },
];
