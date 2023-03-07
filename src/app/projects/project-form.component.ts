import { Component } from '@angular/core';
import { ProjectService } from './project.service';
import {FormControl} from '@angular/forms';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html'
})
export class ProjectFormComponent {
    constructor(private projectService: ProjectService, private errorDialogService: ErrorDialogService) { }

    colorControl = new FormControl('primary' as ThemePalette);
}
