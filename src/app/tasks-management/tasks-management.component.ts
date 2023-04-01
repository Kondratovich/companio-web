import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task, TaskStatus } from './../tasks/task.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from './../tasks/task.service';
import { ConfirmDialogService } from './../shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';
import { TeamService } from '../teams/team.service';
import { Team } from '../teams/team.model';
import { EmployeeService } from '../employees/employee.service';
import { AuthService } from '../auth/auth.service';
import { Employee } from '../employees/employee.model';

@Component({
    selector: 'app-tasks-management',
    templateUrl: './tasks-management.component.html'
})
export class TasksManagementComponent implements OnInit, AfterViewInit {
    readonly displayedColumns: string[] = ['name', 'project', 'description', 'status', 'actions'];
    readonly dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
    projects!: Project[];
    employee!: Employee;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private taskService: TaskService,
        private auhtService: AuthService,
        private employeeService: EmployeeService,
        private projectService: ProjectService,
        private dialogService: ConfirmDialogService,
        private errorDialogService: ErrorDialogService
    ) { }

    getColor(status: TaskStatus): string {
        switch (status) {
            case TaskStatus.NotStarted: return "";
            case TaskStatus.InProgress: return "#dce8f9";
            case TaskStatus.Done: return "#86efb0";
        }
    }

    ngOnInit(): void {
        this.getEmployee();
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

    openMarkTaskAsDoneDialog(task: Task) {
        const options = {
            title: 'Ометить задачу как выполненную?',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.markTaskAsDone(task);
            }
        });
    }

    openMoveToInProgressDialog(task: Task) {
        const options = {
            title: 'Переместить задач в состояние выполнения?',
            message: 'Вы уверены?',
            cancelText: 'Нет',
            confirmText: 'Да'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.moveTaskToInProgress(task);
            }
        });
    }

    markTaskAsDone(task: Task): void {
        task.status = TaskStatus.Done;
        this.taskService.updateTask(task).subscribe({
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    moveTaskToInProgress(task: Task): void {
        task.status = TaskStatus.InProgress;
        this.taskService.updateTask(task).subscribe({
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    getEmployee(): void {
        this.employeeService.getEmployee(this.auhtService.getUserId())
            .subscribe({
                next: employee => {
                    this.employee = employee;
                    this.getProjects();
                },
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe({
                next: projects => {
                    this.projects = projects.filter(p => p.teamId == this.employee.teamId)
                    this.getTasks()
                },
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe({
                next: tasks => this.dataSource.data = tasks.filter(t => this.projects.map(p => p.id).includes(t.projectId)),
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
