import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isAuthenticated: boolean = false;
}