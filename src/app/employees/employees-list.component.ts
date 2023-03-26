import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Employee, Role } from './employee.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from './employee.service';
import { ConfirmDialogService } from '../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';
import { TeamService } from '../teams/team.service';
import { Team } from '../teams/team.model';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-employees-list',
    templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent implements OnInit, AfterViewInit {
    readonly displayedColumns: string[] = ['email', 'firstName', 'lastName', 'role', 'team', 'actions'];
    readonly dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
    teams!: Team[];
    userRole = this.authService.getUserRole();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private employeeService: EmployeeService,
        private teamService: TeamService,
        private dialogService: ConfirmDialogService,
        private errorDialogService: ErrorDialogService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.getTeams();
        this.getEmployees();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDialog(employeeId: string) {
        const options = {
            title: 'Удалить заказчика',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.deleteEmployee(employeeId);
            }
        });
    }

    getEmployees(): void {
        this.employeeService.getEmployees()
            .subscribe({
                next: employees => this.dataSource.data = employees,
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

    deleteEmployee(employeeId: string) {
        this.employeeService.deleteEmployee(employeeId)
            .subscribe({
                next: () => {
                    this.dataSource.data = this.dataSource.data.filter(employee => employee.id !== employeeId);
                },
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getRoleName(role: number): string {
        return Role[role];
    }

    getTeamName(teamId: string): string | undefined {
        return this.teams?.find(team => team.id === teamId)?.name;
    }
}