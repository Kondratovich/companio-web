import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from './project.service';
import { ConfirmDialogService } from './../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from './project.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from '../customers/customer.service';
import { TeamService } from '../teams/team.service';
import { Customer } from '../customers/customer.model';
import { Team } from '../teams/team.model';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
    readonly displayedColumns: string[] = ['name', 'description', 'team', 'customer', 'dateAdded', 'deadline', 'price', 'actions'];
    readonly dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
    teams!: Team[];
    customers!: Customer[];

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private projectService: ProjectService,
        private customerService: CustomerService,
        private teamService: TeamService,
        private dialogService: ConfirmDialogService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.getCustomers();
        this.getTeams();
        this.getProjects();
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

    openDialog(projectId: string) {
        const options = {
            title: 'Удалить проект',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.deleteProject(projectId);
            }
        });
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe({
                next: projects => this.dataSource.data = projects,
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

    getCustomers(): void {
        this.customerService.getCustomers()
            .subscribe({
                next: customers => this.customers = customers,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    deleteProject(projectId: string) {
        this.projectService.deleteProject(projectId)
            .subscribe({
                next: () => this.dataSource.data = this.dataSource.data.filter(project => project.id !== projectId),
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getTeamName(teamId: string): string | undefined {
        return this.teams?.find(team => team.id === teamId)?.name;
    }

    getCustomerName(customerId: string): string | undefined {
        let customer = this.customers?.find(customer => customer.id === customerId);
        return customer?.firstName + ' ' + customer?.lastName;
    }
}
