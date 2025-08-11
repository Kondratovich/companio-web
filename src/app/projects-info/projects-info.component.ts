import { Component, ViewChild, ViewChildren, QueryList, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ProjectService } from './../projects/project.service';
import { ErrorDialogService } from './../shared/components/error-dialog/error-dialog.service';
import { Project } from '../projects/project.model';
import { TaskService } from '../tasks/task.service';
import { Task, TaskStatus } from '../tasks/task.model';
import { Customer } from '../customers/customer.model';
import { CustomerService } from '../customers/customer.service';
import { Team } from '../teams/team.model';
import { TeamService } from '../teams/team.service';
import { MatPaginator } from '@angular/material/paginator';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-projects-info',
    templateUrl: './projects-info.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    imports: [AppMaterialModule, DatePipe, CurrencyPipe, CommonModule]
})
export class ProjectsInfoComponent implements OnInit {
    readonly columnsToDisplay: string[] = ['name', 'description', 'team', 'customer', 'dateAdded', 'deadline', 'price'];
    readonly innerDisplayedColumns: string[] = ['name', 'description', 'status'];
    teams!: Team[];
    customers!: Customer[];

    @ViewChild('outerSort', { static: true }) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;
    @ViewChildren('innerTables') innerTables!: QueryList<MatTable<Task>>;

    dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
    expandedElement!: Project | null;

    constructor(
        private cd: ChangeDetectorRef,
        private projectService: ProjectService,
        private customerService: CustomerService,
        private teamService: TeamService,
        private taskService: TaskService,
        private errorDialogService: ErrorDialogService
    ) { }

    ngOnInit() {
        this.getCustomers();
        this.getTeams();
        this.getProjects();
    }

    toggleRow(element: Project) {
        element.tasks && (element.tasks as MatTableDataSource<Task>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
        this.cd.detectChanges();
        this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Task>).sort = this.innerSort.toArray()[index]);
    }

    applyOuterFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    applyInnerFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.innerTables.forEach((table) => (table.dataSource as MatTableDataSource<Task>).filter = filterValue.trim().toLowerCase());
    }

    getProjects(): void {
        this.projectService.getProjects()
            .subscribe({
                next: projects => {
                    this.dataSource = new MatTableDataSource(projects);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    this.getTasks();
                },
                error: error => this.errorDialogService.openDialog(error.message)
            });
    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe({
                next: tasks => this.setTasksForProjects(tasks),
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

    setTasksForProjects(tasks: Task[]) {
        this.dataSource.data.forEach(project => {
            project.tasks = [];
            var projectTasks = tasks.filter(task => task.projectId === project.id);
            project.tasks = new MatTableDataSource(projectTasks);
        });
    }

    getColor(status: TaskStatus): string {
        switch(status){
            case TaskStatus.NotStarted: return "";
            case TaskStatus.InProgress: return "#dce8f9";
            case TaskStatus.Done: return "#86efb0";
        }
    }

    getTaskStatusName(status: number): string {
        return TaskStatus[status];
    }

    getTeamName(teamId: string): string | undefined {
        return this.teams?.find(team => team.id === teamId)?.name;
    }

    getCustomerName(customerId: string): string | undefined {
        let customer = this.customers?.find(customer => customer.id === customerId);
        return customer?.firstName + ' ' + customer?.lastName;
    }
}
