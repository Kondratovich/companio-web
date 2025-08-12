import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
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
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  imports: [AppMaterialModule, RouterModule]
})
export class TasksListComponent implements OnInit, AfterViewInit {
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private dialogService = inject(ConfirmDialogService);
  private errorDialogService = inject(ErrorDialogService);

  readonly displayedColumns: string[] = ['name', 'project', 'description', 'status', 'actions'];
  readonly dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  projects!: Project[];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        error: error => this.errorDialogService.open(error.message)
      });
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe({
        next: projects => this.projects = projects,
        error: error => this.errorDialogService.open(error.message)
      });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId)
      .subscribe({
        next: () => this.dataSource.data = this.dataSource.data.filter(task => task.id !== taskId),
        error: error => this.errorDialogService.open(error.message)
      });
  }

  getTaskStatusName(status: number): string {
    return TaskStatus[status];
  }

  getProjectName(projectId: string): string | undefined {
    return this.projects?.find(project => project.id === projectId)?.name;
  }
}
