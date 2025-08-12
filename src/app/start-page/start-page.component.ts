import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

interface NasaPicture {
  hdurl: string;
  date: string;
}

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  imports: [CommonModule, RouterModule]
})
export class StartPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  backgroundPicture = '';
  isAuthenticated = false;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.http.get<NasaPicture>('https://api.nasa.gov/planetary/apod?api_key=hr8EGW7RfDZOXqc0TE63xcAwsvzHsoRIZWzPEq8Z')
      .subscribe(response => this.backgroundPicture = response.hdurl);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    this.isAuthenticated = false;
  }
}