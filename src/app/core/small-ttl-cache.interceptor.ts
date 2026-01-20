import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
import { inject, REQUEST } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { isHttpError } from '../shared/catch-http-error';

type Cache =
  | {
      response: HttpEvent<unknown>;
      ttl: Dayjs;
      error?: undefined;
    }
  | {
      response?: undefined;
      ttl: Dayjs;
      error: HttpErrorResponse;
    };

export function smallTtlCacheInterceptor(): HttpInterceptorFn {
  const cache = new Map<string, Cache>();
  return (req, next) => {
    if (req.method !== 'GET') {
      return next(req);
    }
    const ssrRequest = inject(REQUEST, { optional: true });
    const cookies = req.headers.get('Cookie') ?? ssrRequest?.headers.get('Cookie') ?? '';
    const cacheKey = `${req.urlWithParams}-${cookies}`;
    const cached = cache.get(cacheKey);
    if (cached && dayjs().isBefore(cached.ttl)) {
      console.log('cache hit');
      if (cached.error) {
        return throwError(() => cached.error);
      }
      return of(cached.response);
    }
    return next(req).pipe(
      tap((response) => {
        if (response.type !== HttpEventType.Response) {
          return;
        }
        console.log('caching');
        cache.set(cacheKey, { response, ttl: dayjs().add(2.5, 'seconds') });
      }),
      catchError((error: HttpErrorResponse) => {
        if (isHttpError(error?.error)) {
          console.log('caching');

          cache.set(cacheKey, { error, ttl: dayjs().add(2.5, 'seconds') });
        }
        return throwError(() => error);
      }),
    );
  };
}
