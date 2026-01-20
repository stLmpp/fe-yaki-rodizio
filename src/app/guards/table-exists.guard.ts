import { RouteParams } from '../shared/route-params';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TableService } from '../services/table.service';
import { map } from 'rxjs';
import { catchHttpError } from '../shared/catch-http-error';
import { HttpErrorCode } from '../models/http-error';

export function tableExistsGuard(paramName: string = RouteParams.TableId): CanActivateFn {
  return (route) => {
    const tableService = inject(TableService);
    const router = inject(Router);
    const tableId = route.params[paramName];
    return tableService.getTableById(tableId).pipe(
      catchHttpError((error) => {
        if (error.code === HttpErrorCode.table.tableNotFound) {
          return null;
        }
      }),
      map((table) => !!table || new RedirectCommand(router.parseUrl('/not-found'))),
    );
  };
}
