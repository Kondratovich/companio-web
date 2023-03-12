import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from './team.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from './team.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from '../projects/project.model';
import { Employee } from '../employees/employee.model';
import { ProjectService } from '../projects/project.service';
import { EmployeeService } from '../employees/employee.service';

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html'
})
export class TeamFormComponent implements OnInit {
    team?: Team;
    //projectsIdsBefore: string[] = [];
    projects?: Project[];
    employees?: Employee[];
    myForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private teamService: TeamService,
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            nameControl: ['', [Validators.required]],
            descriptionControl: '',
            projectsControl: '',
            employeesControl: '',
        });

        //this.getEmployees();
        //this.getProjects();

        const teamId = this.route.snapshot.paramMap.get('id');
        if (teamId) {
            this.getTeam(teamId);
        }
    }

    getTeam(teamId: string): void {
        this.teamService.getTeam(teamId).subscribe({
            next: team => {
                this.team = team;
                //this.projectsIdsBefore = this.projects?.filter(p => p.teamId === team.id).map(p => p.id).filter(id => id !== undefined) as string[];
                this.myForm.patchValue({
                    nameControl: this.team.name,
                    descriptionControl: this.team.description,
                    //projectsControl: this.projectsIdsBefore,
                    //employeesControl: this.employees?.filter(e => e.teamId === team.id).map(e => e.id),
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

    getEmployees(): void {
        this.employeeService.getEmployees()
            .subscribe({
                next: employees => this.employees = employees,
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    submit(): void {
        // let projectsIdsAfter = this.myForm.get('projectsControl')?.value;
        // let difference = projectsIdsAfter
        //          .filter((x: string) => !this.projectsIdsBefore.includes(x))
        //          .concat(this.projectsIdsBefore.filter(x => !projectsIdsAfter.includes(x)));

        const newTeam: Team = {
            id: this.team?.id,
            name: this.myForm.get('nameControl')?.value,
            description: this.myForm.get('descriptionControl')?.value,
        };

        if (this.team == null) {
            this.teamService.createTeam(newTeam).subscribe({
                next: () => this.router.navigate(['/teams']),
                error: error => this.errorDialogService.openDialog(error.message)
            });

        } else {
            this.teamService.updateTeam(newTeam).subscribe({
                next: () => this.router.navigate(['/teams']),
                error: error => this.errorDialogService.openDialog(error.message)
            });
        }
    }
}
