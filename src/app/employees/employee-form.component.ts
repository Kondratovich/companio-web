import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';
import { TeamService } from '../teams/team.service';
import { Team } from '../teams/team.model';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
    employee?: Employee;
    teams?: Team[];
    myForm!: FormGroup;
    public showPassword: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private teamService: TeamService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            firstNameControl: ['', [Validators.required]],
            lastNameControl: ['', [Validators.required]],
            teamControl: ['', [Validators.required]],
            roleControl: ['', [Validators.required]],
            passwordControl: ['', [Validators.required]],
        });

        const employeeId = this.route.snapshot.paramMap.get('id');
        if (employeeId) {
            this.getEmployee(employeeId);
            this.myForm.controls['passwordControl'].validator = null;
        }

        this.getTeams();
    }

    getEmployee(employeeId: string): void {
        this.employeeService.getEmployee(employeeId).subscribe({
            next: employee => {
                this.employee = employee;
                this.myForm.patchValue({
                    emailControl: this.employee.email,
                    firstNameControl: this.employee.firstName,
                    lastNameControl: this.employee.lastName,
                    teamControl: this.employee.teamId,
                    roleControl: this.employee.role
                });
            },
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    getTeams(): void {
        this.teamService.getTeams()
            .subscribe({
                next: teams => this.teams = teams,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    submit(): void {
        const newEmployee: Employee = {
            id: this.employee?.id,
            email: this.myForm.get('emailControl')?.value,
            firstName: this.myForm.get('firstNameControl')?.value,
            lastName: this.myForm.get('lastNameControl')?.value,
            teamId: this.myForm.get('teamControl')?.value,
            role: this.myForm.get('roleControl')?.value,
            password: this.myForm.get('passwordControl')?.value,
        };

        if (this.employee == null) {
            this.employeeService.registerEmployee(newEmployee).subscribe({
                next: () => this.router.navigate(['/employees']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        } else {
            this.employeeService.updateEmployee(newEmployee).subscribe({
                next: () => this.router.navigate(['/employees']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
