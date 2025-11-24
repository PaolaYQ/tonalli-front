import { Routes } from '@angular/router';
import { Activity } from '../../types/activities.types';
import { ActivityResolver } from '../../resolvers/activity.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'classroom',
    pathMatch: 'full',
  },
  {
    path: 'classroom',
    loadComponent: () => import('./classroom/classroom.component'),
  },
  {
    path: 'activity/:id',
    loadComponent: () => import('./activity/activity.component'),
    resolve: { item: ActivityResolver },
  },
];
