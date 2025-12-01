import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    provideAnimations(), provideAnimationsAsync(),
    provideAnimations(),  // obavezno za MatDialog
    provideHttpClient()
  ]
};
