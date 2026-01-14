import { CanActivateFn, createUrlTreeFromSnapshot, RedirectCommand, Routes } from '@angular/router';
import { RouteParams } from './shared/route-params';
import { inject } from '@angular/core';
import { RoundService } from './services/round.service';
import { map } from 'rxjs';

function resolveLatestRound(): CanActivateFn {
  return (route) => {
    const roundService = inject(RoundService);
    return roundService.getLatestRound(route.params[RouteParams.TableId]).pipe(
      map((round) => {
        if (!round) {
          return new RedirectCommand(createUrlTreeFromSnapshot(route, ['orders', 'new']));
        }
        return new RedirectCommand(
          createUrlTreeFromSnapshot(route, ['orders', round.orderId, 'rounds', round.roundId]),
        );
      }),
    );
  };
}

export const routes: Routes = [
  {
    path: `tables/:${RouteParams.TableId}`,
    pathMatch: 'full',
    canActivate: [resolveLatestRound()],
    children: [],
  },
  {
    path: `tables/:${RouteParams.TableId}/orders/new`,
    // TODO guard
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
    redirectTo: 'tables/1/orders/1/rounds/1', // TODO change to not-found
  },
];
