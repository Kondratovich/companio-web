import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfirmDialogService } from './shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './shared/components/error-dialog/error-dialog.service';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppMaterialModule } from './shared/modules/app.material.module';
import { httpInterceptorsProviders } from './shared/http-interceptors-provider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      JwtModule,
      AppMaterialModule,
      NgxChartsModule,
      CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ),
    ConfirmDialogService,
    ErrorDialogService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    httpInterceptorsProviders
  ]
};
