import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../employees/employee.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivateChild(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const allowedRoles = route.data['allowedRoles'];
    const mapped = allowedRoles.map((r: number) => Role[r]);

    if (this.authService.isAuthenticated() && mapped.includes(this.authService.getUserRole())) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const allowedRoles = route.data['allowedRoles'];
    const mapped = allowedRoles.map((r: number) => Role[r]);

    if (this.authService.isAuthenticated() && mapped.includes(this.authService.getUserRole())) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}