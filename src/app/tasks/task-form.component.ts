import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from './task.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from './task.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { ProjectService } from '../projects/project.service';
import { Project } from '../projects/project.model';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
    projects?: Project[];
    task?: Task;
    myForm!: FormGroup;
    statuses = [
        { value: TaskStatus.NotStarted, viewValue: 'Не начата' },
        { value: TaskStatus.InProgress, viewValue: 'В прогрессе' },
        { value: TaskStatus.Done, viewValue: 'Выполнена' }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private projectService: ProjectService,
        private errorDialogService: ErrorDialogService
    ) { }

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

    submit(): void {
        const newTask: Task = {
            id: this.task?.id,
            name: this.myForm.get('nameControl')?.value,
            description: this.myForm.get('descriptionControl')?.value,
            projectId: this.myForm.get('projectControl')?.value,
            status: this.myForm.get('statusControl')?.value,
        };

        debugger;

        if (this.task == null) {
            this.taskService.createTask(newTask).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        } else {
            this.taskService.updateTask(newTask).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        }
    }
}
