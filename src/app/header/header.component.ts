import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login'])
    }
}