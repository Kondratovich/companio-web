import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  imports: [CommonModule]
})
export class WelcomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = false;
}