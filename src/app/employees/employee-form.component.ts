import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
    employee?: Employee;
    myForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            firstNameControl: '',
            lastNameControl: '',
        });

        const employeeId = this.route.snapshot.paramMap.get('id');
        if (employeeId) {
            this.getEmployee(employeeId);
        }
    }

    getEmployee(employeeId: string): void {
        this.employeeService.getEmployee(employeeId).subscribe({
            next: employee => {
                this.employee = employee;
                this.myForm.patchValue({
                    emailControl: this.employee.email,
                    firstNameControl: this.employee.firstName,
                    lastNameControl: this.employee.lastName
                });
            },
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    submit(): void {
        const newEmployee: Employee = {
            id: this.employee?.id,
            email: this.myForm.get('emailControl')?.value,
            firstName: this.myForm.get('firstNameControl')?.value,
            lastName: this.myForm.get('lastNameControl')?.value,
        };

        if (this.employee == null) {
            this.employeeService.createEmployee(newEmployee).subscribe({
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
}
