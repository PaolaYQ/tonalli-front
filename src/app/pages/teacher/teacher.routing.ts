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
    children: [
      {
        path: '',
        loadComponent: () => import('./class/class.component'),
      },
      {
        path: 'papa-caliente/:topic',
        loadComponent: () => import('./hot-potato/hot-potato.component'),
      },
    ],
  },
];
