import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.authService.getAuthToken();

    if (!/^http(s)?:\/\/localhost/.test(request.url)) {
      // If the request is not to localhost, do not add the authorization header
      return next.handle(request);
    }

    if (authToken) {
      // Clone the request and add the JWT token as an Authorization header
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // If the request returns a 401 Unauthorized status code, redirect the user to the login page
            this.authService.logout();
            location.reload();
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
}