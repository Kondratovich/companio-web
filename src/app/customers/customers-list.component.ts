import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Customer } from './customer.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from './customer.service';
import { ConfirmDialogService } from './../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html'
})
export class CustomersListComponent implements OnInit, AfterViewInit {
    readonly displayedColumns: string[] = ['email', 'firstName', 'lastName', 'actions'];
    readonly dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private customerService: CustomerService,
        private dialogService: ConfirmDialogService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.getCustomers();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDialog(customerId: string) {
        const options = {
            title: 'Удалить заказчика',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.deleteCustomer(customerId);
            }
        });
    }

    getCustomers(): void {
        this.customerService.getCustomers()
            .subscribe({
                next: customers => this.dataSource.data = customers,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    deleteCustomer(customerId: string) {
        this.customerService.deleteCustomer(customerId)
            .subscribe({
                next: () => this.dataSource.data = this.dataSource.data.filter(customer => customer.id !== customerId),
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }
}
