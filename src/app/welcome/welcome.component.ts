import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  imports: [CommonModule]
})
export class WelcomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isAuthenticated: boolean = false;
}