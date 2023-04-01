import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html'
})
export class StartPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) { }

    isAuthenticated: boolean = false;

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
        this.http.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
          .subscribe(response => console.log(response));
      }
}