import { Routes } from '@angular/router';
import { menuResolver } from './menu.resolver';

export const menuRoutes: Routes = [
  {
    path: '',
    resolve: [menuResolver()],
    loadComponent: () => import('./components/menu/menu.component').then((m) => m.MenuComponent),
  },
];
