import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        defaultQueryParamsHandling: 'merge',
        onSameUrlNavigation: 'ignore',
        paramsInheritanceStrategy: 'always',
      }),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      }),
      withViewTransitions({
        skipInitialTransition: true,
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' } satisfies MatFormFieldDefaultOptions,
    },
  ],
};
