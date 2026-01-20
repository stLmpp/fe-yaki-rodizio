import { inject } from '@angular/core';
import { MenuStateService } from './menu.state';
import { ProductService } from '../../services/product.service';
import { RoundService } from '../../services/round.service';
import { forkJoin, tap } from 'rxjs';
import { RouteParams } from '../../shared/route-params';
import { ResolveFn } from '@angular/router';

export function menuResolver(roundIdParamName = RouteParams.RoundId): ResolveFn<unknown> {
  return (route) => {
    const menuState = inject(MenuStateService);
    const productService = inject(ProductService);
    const roundService = inject(RoundService);
    return forkJoin([
      productService.getCategoriesTree(),
      roundService.getRoundWithItems(route.params[roundIdParamName]),
    ]).pipe(
      tap(([categories, round]) => {
        menuState.setCategoriesWithRound(categories, round);
      }),
    );
  };
}
