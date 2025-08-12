import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './project.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Team } from '../teams/team.model';
import { TeamService } from '../teams/team.service';
import { CustomerService } from '../customers/customer.service';
import { Customer } from '../customers/customer.model';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule]
})
export class ProjectFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private teamService = inject(TeamService);
  private customerService = inject(CustomerService);
  private errorDialogService = inject(ErrorDialogService);

  project?: Project;
  teams?: Team[];
  customers?: Customer[];
  myForm!: FormGroup;

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
      error: error => this.errorDialogService.open(error.message)
    });
  }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe({
        next: teams => this.teams = teams,
        error: error => this.errorDialogService.open(error.message)
      });
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe({
        next: customers => this.customers = customers,
        error: error => this.errorDialogService.open(error.message)
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
        error: error => this.errorDialogService.open(error.message)
      });
    } else {
      this.projectService.updateProject(newProject).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });
    }
  }
}
