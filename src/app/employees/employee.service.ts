import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Employee } from './employee.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/users`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/users/${id}`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );;
  }

  registerEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/register`, employee, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/users/${employee.id}`, employee, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/users/${id}`, { headers: this.headers }).pipe(
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