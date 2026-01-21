import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export function loggingInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    console.log(`HTTP Request to ${req.urlWithParams}`);
    return next(req).pipe(
      tap((response) => {
        if (response.type !== HttpEventType.Response) {
          return;
        }
        console.log(
          `HTTP Response from ${req.urlWithParams} - Status = ${response.status}`,
          response.body,
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(
          `HTTP Response from ${req.urlWithParams} - Status = ${error.status}`,
          error.error,
        );
        return throwError(() => error);
      }),
    );
  };
}
