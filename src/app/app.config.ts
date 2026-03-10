import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideAuth0({
      domain: 'login.bailo.ch',
      clientId: 'pArbEhROiWpOaHFCprb8hm8FJrszoJyX',
      useRefreshTokens: true,
      authorizationParams: {
        redirect_uri: window.location.origin,
        ui_locales: 'fr',
        audience: 'https://api.bailo.ch',
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://api.bailo.ch/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://api.bailo.ch',
                scope: 'openid profile email',
              },
            },
          },
        ],
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
};
