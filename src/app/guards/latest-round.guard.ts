import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoundService } from '../services/round.service';
import { RouteParams } from '../shared/route-params';
import { map } from 'rxjs';
import { catchHttpError } from '../shared/catch-http-error';
import { HttpErrorCode } from '../models/http-error';

export function latestRoundGuard(shouldRedirectToNew: boolean): CanActivateFn {
  return (route) => {
    const roundService = inject(RoundService);
    const router = inject(Router);
    return roundService.getLatestRound(route.params[RouteParams.TableId]).pipe(
      map((round) => {
        if (!round) {
          if (shouldRedirectToNew) {
            return new RedirectCommand(
              router.createUrlTree(['/tables', route.params[RouteParams.TableId], 'orders', 'new']),
            );
          }
          return true;
        }
        return new RedirectCommand(
          router.createUrlTree([
            '/tables',
            round.tableId,
            'orders',
            round.orderId,
            'rounds',
            round.roundId,
          ]),
        );
      }),
      catchHttpError((error) => {
        if (
          error.code === HttpErrorCode.round.tableNotFound ||
          error.code === HttpErrorCode.table.tableNotFound
        ) {
          return new RedirectCommand(router.parseUrl('/not-found'));
        }
      }),
    );
  };
}
