import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Team } from './team.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamService } from './team.service';
import { ConfirmDialogService } from './../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html'
})
export class TeamsListComponent implements OnInit, AfterViewInit {
    readonly displayedColumns: string[] = ['name', 'description', 'actions'];
    readonly dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private teamService: TeamService,
        private dialogService: ConfirmDialogService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.getTeams();
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

    openDialog(teamId: string) {
        const options = {
            title: 'Удалить заказчика',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.deleteTeam(teamId);
            }
        });
    }

    getTeams(): void {
        this.teamService.getTeams()
            .subscribe({
                next: teams => this.dataSource.data = teams,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    deleteTeam(teamId: string) {
        this.teamService.deleteTeam(teamId)
            .subscribe({
                next: () => this.dataSource.data = this.dataSource.data.filter(team => team.id !== teamId),
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }
}
