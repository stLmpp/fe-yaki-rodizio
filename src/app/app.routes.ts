import { Routes } from '@angular/router';
import { RouteParams } from './shared/route-params';

export const routes: Routes = [
  {
    path: `tables/:${RouteParams.TableId}/orders/:${RouteParams.OrderId}/rounds/:${RouteParams.RoundId}`,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu',
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then((m) => m.cartRoutes),
      },
      {
        path: 'menu',
        loadChildren: () => import('./features/menu/menu.routes').then((m) => m.menuRoutes),
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'tables/1/orders/1/rounds/1', // TODO change to not-found
  },
];
