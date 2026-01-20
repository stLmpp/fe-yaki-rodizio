import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export function cookieSSRInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    console.log('req.url', req.url);
    const isServer = isPlatformServer(inject(PLATFORM_ID));
    if (!isServer) {
      return next(req);
    }
    const ssrRequest = inject(REQUEST, { optional: true });
    const clonedReq = req.clone({
      headers: req.headers.set('Cookie', ssrRequest?.headers.get('Cookie') ?? ''),
      withCredentials: true,
    });
    return next(clonedReq);
  };
}
