import { inject, provideAppInitializer } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of, switchMap } from 'rxjs';

export function provideAuthInitializer() {
  return provideAppInitializer(() => {
    const authService = inject(AuthService);
    return authService.getSession().pipe(
      switchMap((response) => {
        if (!response) {
          return authService.signInAnonymous();
        }
        return of(null);
      }),
    );
  });
}
