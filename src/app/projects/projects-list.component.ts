import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { ConfirmDialogService } from './../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from './project.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
    readonly displayedColumns: string[] = ['name', 'description', 'dateAdded', 'deadline', 'price', 'actions'];
    readonly dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private projectService: ProjectService, private dialogService: ConfirmDialogService, private errorDialogService: ErrorDialogService) { }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getProjects();
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
            .subscribe(projects => this.dataSource.data = projects);
    }

    deleteProject(projectId: string) {
        debugger;
        this.projectService.deleteProject(projectId)
            .subscribe({
            next: () => {
              console.log('Project deleted successfully');
              this.dataSource.data = this.dataSource.data.filter(project => project.id !== projectId);
              debugger;
            },
            error: (error) => {
                this.errorDialogService.openDialog(error.message);
            }
          });
    }
}
