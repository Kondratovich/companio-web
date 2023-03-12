import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from './customer.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
    customer?: Customer;
    myForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            firstNameControl: ['', [Validators.required]],
            lastNameControl: ['', [Validators.required]],
        });

        const customerId = this.route.snapshot.paramMap.get('id');
        if (customerId) {
            this.getCustomer(customerId);
        }
    }

    getCustomer(customerId: string): void {
        this.customerService.getCustomer(customerId).subscribe({
            next: customer => {
                this.customer = customer;
                this.myForm.patchValue({
                    emailControl: this.customer.email,
                    firstNameControl: this.customer.firstName,
                    lastNameControl: this.customer.lastName
                });
            },
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    submit(): void {
        const newCustomer: Customer = {
            id: this.customer?.id,
            email: this.myForm.get('emailControl')?.value,
            firstName: this.myForm.get('firstNameControl')?.value,
            lastName: this.myForm.get('lastNameControl')?.value,
        };

        if (this.customer == null) {
            this.customerService.createCustomer(newCustomer).subscribe({
                next: () => this.router.navigate(['/customers']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        } else {
            this.customerService.updateCustomer(newCustomer).subscribe({
                next: () => this.router.navigate(['/customers']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        }
    }
}
