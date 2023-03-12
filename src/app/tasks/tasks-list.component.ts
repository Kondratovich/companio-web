import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from './task.service';
import { ConfirmDialogService } from './../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit, AfterViewInit {
    readonly displayedColumns: string[] = ['name', 'project', 'description', 'status', 'actions'];
    readonly dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
    projects!: Project[];

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private taskService: TaskService,
        private projectService: ProjectService,
        private dialogService: ConfirmDialogService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.getTasks();
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

    openDialog(taskId: string) {
        const options = {
            title: 'Удалить заказчика',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.deleteTask(taskId);
            }
        });
    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe({
                next: tasks => this.dataSource.data = tasks,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe({
                next: projects => this.projects = projects,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    deleteTask(taskId: string) {
        this.taskService.deleteTask(taskId)
            .subscribe({
                next: () => this.dataSource.data = this.dataSource.data.filter(task => task.id !== taskId),
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getTaskStatusName(status: number): string {
        return TaskStatus[status];
    }

    getProjectName(projectId: string): string | undefined {
        return this.projects?.find(project => project.id === projectId)?.name;
    }
}
