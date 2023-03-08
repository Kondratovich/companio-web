import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './task.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from './task.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
    task?: Task;
    myForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            nameControl: '',
            descriptionControl: '',
            statusControl: ''
        });

        const taskId = this.route.snapshot.paramMap.get('id');
        if (taskId) {
            this.getTask(taskId);
        }
    }

    getTask(taskId: string): void {
        this.taskService.getTask(taskId).subscribe({
            next: task => {
                this.task = task;
                this.myForm.patchValue({
                    nameControl: this.task.name,
                    descriptionControl: this.task.description,
                    statusControl: this.task.status?.toString()
                });
            },
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    submit(): void {
        const newTask: Task = {
            id: this.task?.id,
            name: this.myForm.get('nameControl')?.value,
            description: this.myForm.get('descriptionControl')?.value,
            status: this.myForm.get('statusControl')?.value,
        };

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
