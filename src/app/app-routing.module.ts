import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './projects/projects-list.component';
import { EmployeesListComponent } from './employees/employees-list.component';
import { CustomersListComponent } from './customers/customers-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectFormComponent } from './projects/project-form.component';
import { CustomerFormComponent } from './customers/customer-form.component';
import { EmployeeFormComponent } from './employees/employee-form.component';

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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }