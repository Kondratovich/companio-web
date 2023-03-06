import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
    readonly displayedColumns: string[] = ['name', 'description', 'dateAdded', 'deadline', 'price', 'actions'];
    readonly dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private projectService: ProjectService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getProjects();
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe(projects => this.dataSource.data = projects);
    }

    openDialog() {
        this.dialog.open(DialogElementsExampleDialog);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

@Component({
    selector: 'dialog-elements-example-dialog',
    template: `<h1>Are you?</h1>`
  })
  export class DialogElementsExampleDialog {}