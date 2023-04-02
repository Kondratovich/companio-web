import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AbsenceTimeline } from './absenceTimeline.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class AbsenceTimelineService {
    private apiUrl = environment.apiUrl;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getAbsenceTimelines(userId: string): Observable<AbsenceTimeline[]> {
        return this.http.get<AbsenceTimeline[]>(`${this.apiUrl}/absences?userId=${userId}`, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    getAbsenceTimeline(id: string): Observable<AbsenceTimeline> {
        return this.http.get<AbsenceTimeline>(`${this.apiUrl}/absences/${id}`, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );;
    }

    createAbsenceTimeline(absence: AbsenceTimeline): Observable<AbsenceTimeline> {
        return this.http.post<AbsenceTimeline>(`${this.apiUrl}/absences`, absence, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    updateAbsenceTimeline(absence: AbsenceTimeline): Observable<AbsenceTimeline> {
        return this.http.put<AbsenceTimeline>(`${this.apiUrl}/absences/${absence.id}`, absence, { headers: this.headers }).pipe(
            map(res => res),
            catchError(this.handleError)
        );
    }

    deleteAbsenceTimeline(id: string): Observable<AbsenceTimeline> {
        return this.http.delete<AbsenceTimeline>(`${this.apiUrl}/absences/${id}`, { headers: this.headers }).pipe(
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