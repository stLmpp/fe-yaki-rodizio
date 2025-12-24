import { Routes } from '@angular/router';

export const menuRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/menu/menu.component').then((m) => m.MenuComponent),
  },
];
