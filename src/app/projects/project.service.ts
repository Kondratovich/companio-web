import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Project } from './project.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private apiUrl = environment.apiUrl;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}/projects`, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    getProject(id: string): Observable<Project> {
        const url = `${this.apiUrl}/projects/${id}`;
        return this.http.get<Project>(url).pipe(
            map(res => res),
            catchError(this.handleError)
        );;
    }

    deleteProject(id: string): Observable<Project> {
        const url = `${this.apiUrl}/projects/${id}`;
        return this.http.delete<Project>(url).pipe(
            map(res => res),
            catchError(this.handleError)
        );;
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