import { catchError, of, OperatorFunction, throwError } from 'rxjs';
import { HttpError } from '../models/http-error';
import { HttpErrorResponse } from '@angular/common/http';

export function isHttpError(error: unknown): error is HttpError {
  return !!error && typeof error === 'object' && 'code' in error && 'message' in error;
}

export function catchHttpError<T, R>(
  callback: (error: HttpError) => void | R,
): OperatorFunction<T, T | Exclude<R, undefined>> {
  return catchError((error: HttpErrorResponse) => {
    if (isHttpError(error.error)) {
      const value = callback(error.error);
      if (value !== undefined) {
        return of(value);
      }
    }
    return throwError(() => error);
  }) as never;
}
