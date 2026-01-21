import { inject } from '@angular/core';
import { MenuStateService } from './menu.state';
import { ProductService } from '../../services/product.service';
import { RoundService } from '../../services/round.service';
import { forkJoin, tap } from 'rxjs';
import { RouteParams } from '../../shared/route-params';
import { ResolveFn } from '@angular/router';
import { OrderService } from '../../services/order.service';

export function menuResolver(): ResolveFn<unknown> {
  return (route) => {
    const menuState = inject(MenuStateService);
    const productService = inject(ProductService);
    const roundService = inject(RoundService);
    const orderService = inject(OrderService);
    return forkJoin([
      productService.getCategoriesTree(),
      roundService.getRoundWithItems(route.params[RouteParams.RoundId]),
      orderService.getOrder(route.params[RouteParams.OrderId]),
    ]).pipe(
      tap(([categories, round, order]) => {
        menuState.setInitialState(categories, round, order);
      }),
    );
  };
}
