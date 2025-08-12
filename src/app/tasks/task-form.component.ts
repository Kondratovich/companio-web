import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from './task.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { ProjectService } from '../projects/project.service';
import { Project } from '../projects/project.model';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [AppMaterialModule, ReactiveFormsModule, CommonModule]
})
export class TaskFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private errorDialogService = inject(ErrorDialogService);

  projects?: Project[];
  task?: Task;
  myForm!: FormGroup;
  statuses = [
    { value: TaskStatus.NotStarted, viewValue: 'Не начата' },
    { value: TaskStatus.InProgress, viewValue: 'В прогрессе' },
    { value: TaskStatus.Done, viewValue: 'Выполнена' }
  ];

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nameControl: ['', [Validators.required]],
      descriptionControl: '',
      projectControl: ['', [Validators.required]],
      statusControl: [TaskStatus.NotStarted, [Validators.required]],
    });

    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.getTask(taskId);
    }

    this.getProjects();
  }

  getTask(taskId: string): void {
    this.taskService.getTask(taskId).subscribe({
      next: task => {
        this.task = task;
        this.myForm.patchValue({
          nameControl: this.task.name,
          descriptionControl: this.task.description,
          projectControl: this.task.projectId,
          statusControl: this.task.status,
        });
      },
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

  submit(): void {
    const newTask: Task = {
      id: this.task?.id,
      name: this.myForm.get('nameControl')?.value,
      description: this.myForm.get('descriptionControl')?.value,
      projectId: this.myForm.get('projectControl')?.value,
      status: this.myForm.get('statusControl')?.value,
    };

    if (this.task == null) {
      this.taskService.createTask(newTask).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });
    } else {
      this.taskService.updateTask(newTask).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });
    }
  }
}
