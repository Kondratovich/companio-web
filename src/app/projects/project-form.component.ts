import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './project.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from './project.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {
    project?: Project;
    myForm!: FormGroup;
    colorControl = new FormControl('primary' as ThemePalette);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            nameControl: '',
            descriptionControl: '',
            deadlineControl: '',
            priceControl: ''
        });

        const projectId = this.route.snapshot.paramMap.get('id');
        if (projectId) {
            this.getProject(projectId);
        }
    }

    getProject(projectId: string): void {
        this.projectService.getProject(projectId).subscribe({
            next: project => {
                this.project = project;
                this.myForm.patchValue({
                    nameControl: this.project.name,
                    descriptionControl: this.project.description,
                    deadlineControl: this.project.deadline,
                    priceControl: this.project.price
                });
            },
            error: error => this.errorDialogService.openDialog(error.message)
        });
    }

    submit(): void {
        const newProject: Project = {
            id: this.project?.id,
            name: this.myForm.get('nameControl')?.value,
            description: this.myForm.get('descriptionControl')?.value,
            deadline: this.myForm.get('deadlineControl')?.value,
            price: this.myForm.get('priceControl')?.value,
            teamId: '000000000000000000000000',
            customerId: '000000000000000000000000',
        };

        if (this.project == null) {
            this.projectService.createProject(newProject).subscribe({
                next: () => this.router.navigate(['/projects']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        } else {
            this.projectService.updateProject(newProject).subscribe({
                next: () => this.router.navigate(['/projects']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        }
    }
}
