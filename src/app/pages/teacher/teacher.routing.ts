import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./classes-list/classes-list.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./class/class.component'),
  },
];
