import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from './team.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from './team.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from '../projects/project.model';
import { Employee } from '../employees/employee.model';
import { ProjectService } from '../projects/project.service';
import { EmployeeService } from '../employees/employee.service';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-form',
  standalone: true,
  templateUrl: './team-form.component.html',
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule]
})
export class TeamFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private teamService = inject(TeamService);
  private projectService = inject(ProjectService);
  private employeeService = inject(EmployeeService);
  private errorDialogService = inject(ErrorDialogService);

  team?: Team;
  projects?: Project[];
  employees?: Employee[];
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nameControl: ['', [Validators.required]],
      descriptionControl: '',
      projectsControl: '',
      employeesControl: '',
    });

    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.getTeam(teamId);
    }
  }

  getTeam(teamId: string): void {
    this.teamService.getTeam(teamId).subscribe({
      next: team => {
        this.team = team;
        this.myForm.patchValue({
          nameControl: this.team.name,
          descriptionControl: this.team.description,
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

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: employees => this.employees = employees,
        error: error => this.errorDialogService.open(error.message)
      });
  }

  submit(): void {
    const newTeam: Team = {
      id: this.team?.id,
      name: this.myForm.get('nameControl')?.value,
      description: this.myForm.get('descriptionControl')?.value,
    };

    if (this.team == null) {
      this.teamService.createTeam(newTeam).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });

    } else {
      this.teamService.updateTeam(newTeam).subscribe({
        next: () => this.router.navigate(['../'], { relativeTo: this.route }),
        error: error => this.errorDialogService.open(error.message)
      });
    }
  }
}
