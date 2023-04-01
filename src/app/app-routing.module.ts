import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './projects/projects-list.component';
import { EmployeesListComponent } from './employees/employees-list.component';
import { CustomersListComponent } from './customers/customers-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectFormComponent } from './projects/project-form.component';
import { CustomerFormComponent } from './customers/customer-form.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { TeamFormComponent } from './teams/team-form.component';
import { TeamsListComponent } from './teams/teams-list.component';
import { TaskFormComponent } from './tasks/task-form.component';
import { TasksListComponent } from './tasks/tasks-list.component';
import { ProjectsInfoComponent } from './projects-info/projects-info.component';
import { TeamsInfoComponent } from './teams-info/teams-info.component';
import { ProjectsPricesChartComponent } from './projects-prices-chart/projects-prices-chart.component';
import { TasksStatusesChartComponent } from './tasks-statuses-chart/tasks-statuses-chart.component';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { Role } from './employees/employee.model';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { TasksManagementComponent } from './tasks-management/tasks-management.component';
import { DemoComponent } from './absence-calendar/absence-calendar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminNavbarComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [Role.Administrator] },
    children: [
      { path: 'projects-info', component: ProjectsInfoComponent },
      { path: 'projects', component: ProjectsListComponent },
      { path: 'projects/create', component: ProjectFormComponent },
      { path: 'projects/:id', component: ProjectFormComponent },
      { path: 'employees/create', component: EmployeeFormComponent },
      { path: 'employees/:id', component: EmployeeFormComponent },
      { path: 'employees', component: EmployeesListComponent },
      { path: 'customers/create', component: CustomerFormComponent },
      { path: 'customers/:id', component: CustomerFormComponent },
      { path: 'customers', component: CustomersListComponent },
      { path: 'teams-info', component: TeamsInfoComponent },
      { path: 'teams/create', component: TeamFormComponent },
      { path: 'teams/:id', component: TeamFormComponent },
      { path: 'teams', component: TeamsListComponent },
      { path: 'tasks/create', component: TaskFormComponent },
      { path: 'tasks/:id', component: TaskFormComponent },
      { path: 'tasks', component: TasksListComponent },
      { path: 'projects-prices-chart', component: ProjectsPricesChartComponent },
      { path: 'revenue-chart', component: RevenueChartComponent },
      { path: 'tasks-statuses-chart', component: TasksStatusesChartComponent },
    ]
  },
  {
    path: 'manager',
    component: ManagerNavbarComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [Role.Manager] },
    children: [
      { path: 'projects-info', component: ProjectsInfoComponent },
      { path: 'projects/create', component: ProjectFormComponent },
      { path: 'projects/:id', component: ProjectFormComponent },
      { path: 'projects', component: ProjectsListComponent },
      { path: 'employees', component: EmployeesListComponent },
      { path: 'customers/create', component: CustomerFormComponent },
      { path: 'customers/:id', component: CustomerFormComponent },
      { path: 'customers', component: CustomersListComponent },
      { path: 'teams-info', component: TeamsInfoComponent },
      { path: 'teams/create', component: TeamFormComponent },
      { path: 'teams/:id', component: TeamFormComponent },
      { path: 'teams', component: TeamsListComponent },
      { path: 'tasks/create', component: TaskFormComponent },
      { path: 'tasks/:id', component: TaskFormComponent },
      { path: 'tasks', component: TasksListComponent },
      { path: 'projects-prices-chart', component: ProjectsPricesChartComponent },
      { path: 'revenue-chart', component: RevenueChartComponent },
      { path: 'tasks-statuses-chart', component: TasksStatusesChartComponent },
    ]
  },
  {
    path: 'employee',
    component: EmployeeNavbarComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [Role.Employee] },
    children: [
      { path: 'projects-info', component: ProjectsInfoComponent },
      { path: 'teams-info', component: TeamsInfoComponent },
      { path: 'tasks-management', component: TasksManagementComponent },
      { path: 'absence-management', component: DemoComponent },
    ]
  },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }