import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from './customer.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  imports: [AppMaterialModule, ReactiveFormsModule, CommonModule]
})
export class CustomerFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private errorDialogService = inject(ErrorDialogService);

  customer?: Customer;
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      emailControl: ['', [Validators.required, Validators.email]],
      firstNameControl: ['', [Validators.required]],
      lastNameControl: ['', [Validators.required]],
      organizationControl: ['', [Validators.required]],
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
          lastNameControl: this.customer.lastName,
          organizationControl: this.customer.organization,
        });
      },
      error: error => this.errorDialogService.open(error.message)
    });
  }

  submit(): void {
    const newCustomer: Customer = {
      id: this.customer?.id,
      email: this.myForm.get('emailControl')?.value,
      firstName: this.myForm.get('firstNameControl')?.value,
      lastName: this.myForm.get('lastNameControl')?.value,
      organization: this.myForm.get('organizationControl')?.value,
    };

    if (this.customer == null) {
      this.customerService.createCustomer(newCustomer).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });
    } else {
      this.customerService.updateCustomer(newCustomer).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });
    }
  }
}
