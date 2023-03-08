import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Team } from './team.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private apiUrl = environment.apiUrl;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${this.apiUrl}/teams`, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    getTeam(id: string): Observable<Team> {
        return this.http.get<Team>(`${this.apiUrl}/teams/${id}`, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );;
    }

    createTeam(team: Team): Observable<Team> {
        return this.http.post<Team>(`${this.apiUrl}/teams`, team, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    updateTeam(team: Team): Observable<Team> {
        return this.http.put<Team>(`${this.apiUrl}/teams/${team.id}`, team, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    deleteTeam(id: string): Observable<Team> {
        return this.http.delete<Team>(`${this.apiUrl}/teams/${id}`, { headers: this.headers }).pipe(
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