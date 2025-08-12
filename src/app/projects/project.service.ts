import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Project } from './project.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );;
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${project.id}`, project, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/projects/${id}`, { headers: this.headers }).pipe(
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