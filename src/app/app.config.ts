import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAuth0} from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'bailo.eu.auth0.com',
      clientId: 'pArbEhROiWpOaHFCprb8hm8FJrszoJyX',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
};
