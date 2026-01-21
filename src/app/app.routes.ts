import { Routes } from '@angular/router';
import { RouteParams } from './shared/route-params';
import { latestRoundGuard } from './guards/latest-round.guard';

export const routes: Routes = [
  {
    path: `tables/:${RouteParams.TableId}`,
    pathMatch: 'full',
    canActivate: [latestRoundGuard(true)],
    children: [],
  },
  {
    path: `tables/:${RouteParams.TableId}/orders/new`,
    canActivate: [latestRoundGuard(false)],
    loadComponent: () =>
      import('./features/order/order-new/order-new.component').then((m) => m.OrderNewComponent),
  },
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
        // TODO guard
        loadChildren: () => import('./features/cart/cart.routes').then((m) => m.cartRoutes),
      },
      {
        path: 'menu',
        // TODO guard
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
    redirectTo: '/not-found', // TODO change to not-found
  },
];
