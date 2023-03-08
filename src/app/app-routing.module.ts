import { NgModule } from '@angular/core';
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

const routes: Routes = [
  { path: 'projects/create', component: ProjectFormComponent },
  { path: 'projects/:id', component: ProjectFormComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'employees/create', component: EmployeeFormComponent },
  { path: 'employees/:id', component: EmployeeFormComponent },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'customers/create', component: CustomerFormComponent },
  { path: 'customers/:id', component: CustomerFormComponent },
  { path: 'customers', component: CustomersListComponent },
  { path: 'teams/create', component: TeamFormComponent },
  { path: 'teams/:id', component: TeamFormComponent },
  { path: 'teams', component: TeamsListComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskFormComponent },
  { path: 'tasks', component: TasksListComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }