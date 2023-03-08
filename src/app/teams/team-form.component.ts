import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from './team.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from './team.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html'
})
export class TeamFormComponent implements OnInit {
    team?: Team;
    myForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private teamService: TeamService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            nameControl: '',
            descriptionControl: ''
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
                    descriptionControl: this.team.description
                });
            },
            error: error => this.errorDialogService.openDialog(error.message)
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
