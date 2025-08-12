import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from './customer.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );;
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, customer, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/customers/${customer.id}`, customer, { headers: this.headers }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/customers/${id}`, { headers: this.headers }).pipe(
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