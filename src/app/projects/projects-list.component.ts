import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
    projects: Project[] = [];

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.getProjects();
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe(projects => this.projects = projects);
    }
}