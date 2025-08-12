import { Component, ViewChild, ViewChildren, QueryList, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ProjectService } from './../projects/project.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from '../projects/project.model';
import { TeamService } from '../teams/team.service';
import { EmployeeService } from '../employees/employee.service';
import { Team } from '../teams/team.model';
import { Employee, Role } from '../employees/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-teams-info',
  templateUrl: './teams-info.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [AppMaterialModule, CommonModule, DatePipe]
})
export class TeamsInfoComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);
  private teamService = inject(TeamService);
  private employeeService = inject(EmployeeService);
  private projectService = inject(ProjectService);
  private errorDialogService = inject(ErrorDialogService);

  readonly columnsToDisplay: string[] = ['name', 'description'];
  readonly innerDisplayedColumns1: string[] = ['email', 'firstName', 'lastName', 'role'];
  readonly innerDisplayedColumns2: string[] = ['name', 'dateAdded', 'deadline', 'price'];;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('outerSort', { static: true }) sort!: MatSort;
  @ViewChildren('innerSortEmpl') innerSortEmpl!: QueryList<MatSort>;
  @ViewChildren('innerSortProj') innerSortProj!: QueryList<MatSort>;
  @ViewChildren('innerTablesEmpl') innerTablesEmpl!: QueryList<MatTable<Employee>>;
  @ViewChildren('innerTablesProj') innerTablesProj!: QueryList<MatTable<Project>>;

  dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>();
  expandedElement!: Team | null;

  ngOnInit() {
    this.getTeams();
  }

  toggleRow() {
    this.cd.detectChanges();
    this.innerTablesEmpl.forEach((table, index) => (table.dataSource as MatTableDataSource<Employee>).sort = this.innerSortEmpl.toArray()[index]);
    this.innerTablesProj.forEach((table, index) => (table.dataSource as MatTableDataSource<Project>).sort = this.innerSortProj.toArray()[index]);
  }

  applyOuterFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterForEmployees(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.innerTablesEmpl.forEach((table) => (table.dataSource as MatTableDataSource<Employee>).filter = filterValue.trim().toLowerCase());
  }

  applyFilterForProjects(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.innerTablesProj.forEach((table) => (table.dataSource as MatTableDataSource<Project>).filter = filterValue.trim().toLowerCase());
  }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe({
        next: teams => {
          this.dataSource = new MatTableDataSource(teams);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.getEmployees();
          this.getProjects();
        },
        error: error => this.errorDialogService.open(error.message)
      });
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: employees => this.setEmployeesForTeams(employees),
        error: error => this.errorDialogService.open(error.message)
      });
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe({
        next: projects => this.setProjectsForTeams(projects),
        error: error => this.errorDialogService.open(error.message)
      });
  }

  setEmployeesForTeams(employees: Employee[]) {
    this.dataSource.data.forEach(team => {
      team.employees = [];
      const teamEmployees = employees.filter(employee => employee.teamId === team.id);
      team.employees = new MatTableDataSource(teamEmployees);
    });
  }

  setProjectsForTeams(projects: Project[]) {
    this.dataSource.data.forEach(team => {
      team.projects = [];
      const teamProjects = projects.filter(project => project.teamId === team.id);
      team.projects = new MatTableDataSource(teamProjects);
    });
  }

  getRoleName(role: number): string {
    return Role[role];
  }
}
