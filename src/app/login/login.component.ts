import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../employees/employee.model';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';
import { LoginModel } from './login.model';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [AppMaterialModule, ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private errorDialogService = inject(ErrorDialogService);

  myForm!: FormGroup;
  loginModel?: LoginModel;
  showPassword = false;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      emailControl: ['', [Validators.required, Validators.email]],
      passwordControl: ['', [Validators.required]],
    });
  }

  submit() {
    const credentials: LoginModel = {
      email: this.myForm.get('emailControl')?.value,
      password: this.myForm.get('passwordControl')?.value,
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        const userRole = this.authService.getUserRole();
        switch (userRole) {
          case Role[0]:
            this.router.navigate(['/admin/projects-info']);
            break;
          case Role[1]:
            this.router.navigate(['/manager/projects-info']);
            break;
          case Role[2]:
            this.router.navigate(['/employee/projects-info']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
      },
      error: error => this.errorDialogService.open(error.message)
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}