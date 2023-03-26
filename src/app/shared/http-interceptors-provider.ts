import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
//import { ServerErrorInterceptorService } from './server-error-interceptor.service';

export const httpInterceptorsProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptorService, multi: true },
];