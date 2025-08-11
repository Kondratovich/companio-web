import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { environment } from "../../enviroments/enviroment"
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
        private cookieService: CookieService
    ) { }

    login(credentials: any) {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                this.cookieService.set('jwt', (response as loginResponse).token);
            }),
            catchError(this.handleError)
        );
    }

    logout() {
        this.cookieService.delete('jwt');
    }

    isAuthenticated(): boolean {
        const token = this.cookieService.get('jwt');
        return !this.jwtHelper.isTokenExpired(token);
    }

    getAuthToken(): string | null {
        return this.cookieService.get('jwt');
    }

    getUserRole(): string {
        const token = this.cookieService.get('jwt');
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.role;
        }
        return '';
    }

    getUserId(): string {
        const token = this.cookieService.get('jwt');
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.nameid;
        }
        return '';
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage;
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = error.error.message;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        const errorObject = { name: 'HttpError', message: errorMessage };
        return throwError(() => errorObject);
    }
}

interface loginResponse {
    token: string;
}