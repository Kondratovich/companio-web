import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        return this.http.get<Project[]>(`${this.apiUrl}/projects`, { headers: this.headers });
    }

    getProject(id: number): Observable<Project> {
        const url = `${this.apiUrl}/projects/${id}`;
        return this.http.get<Project>(url);
    }
}