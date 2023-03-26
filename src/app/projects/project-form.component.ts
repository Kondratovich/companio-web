import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './project.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from './project.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Team } from '../teams/team.model';
import { TeamService } from '../teams/team.service';
import { CustomerService } from '../customers/customer.service';
import { Customer } from '../customers/customer.model';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {
    project?: Project;
    teams?: Team[];
    customers?: Customer[];
    myForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private teamService: TeamService,
        private customerService: CustomerService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            nameControl: ['', [Validators.required]],
            descriptionControl: '',
            deadlineControl: '',
            priceControl: '',
            customerControl: ['', [Validators.required]],
            teamControl: ['', [Validators.required]]
        });
        
        const projectId = this.route.snapshot.paramMap.get('id');
        if (projectId) {
            this.getProject(projectId);
        }

        this.getTeams();
        this.getCustomers();
    }

    getProject(projectId: string): void {
        this.projectService.getProject(projectId).subscribe({
            next: project => {
                this.project = project;
                this.myForm.patchValue({
                    nameControl: this.project.name,
                    descriptionControl: this.project.description,
                    deadlineControl: this.project.deadline,
                    priceControl: this.project.price,
                    customerControl: this.project.customerId,
                    teamControl: this.project.teamId
                });
            },
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

    submit(): void {
        const newProject: Project = {
            id: this.project?.id,
            name: this.myForm.get('nameControl')?.value,
            description: this.myForm.get('descriptionControl')?.value,
            deadline: this.myForm.get('deadlineControl')?.value,
            price: this.myForm.get('priceControl')?.value,
            teamId: this.myForm.get('teamControl')?.value,
            customerId: this.myForm.get('customerControl')?.value,
        };

        if (this.project == null) {
            this.projectService.createProject(newProject).subscribe({
                next: () => this.router.navigate(['../'], { relativeTo: this.route }),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        } else {
            this.projectService.updateProject(newProject).subscribe({
                next: () => this.router.navigate(['../'], { relativeTo: this.route }),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        }
    }
}
