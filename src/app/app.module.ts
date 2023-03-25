import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './shared/components/confirm-dialog/confirm-dialog.service';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { ErrorDialogService } from './shared/components/error-dialog/error-dialog.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsListComponent } from './projects/projects-list.component';
import { ProjectFormComponent } from './projects/project-form.component';
import { EmployeesListComponent } from './employees/employees-list.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { CustomersListComponent } from './customers/customers-list.component';
import { CustomerFormComponent } from './customers/customer-form.component';
import { TeamsListComponent } from './teams/teams-list.component';
import { TeamFormComponent } from './teams/team-form.component';
import { TasksListComponent } from './tasks/tasks-list.component';
import { TaskFormComponent } from './tasks/task-form.component';
import { ProjectsInfoComponent } from './projects-info/projects-info.component';
import { TeamsInfoComponent } from './teams-info/teams-info.component';
import { ProjectsPricesChartComponent } from './projects-prices-chart/projects-prices-chart.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { TasksStatusesChartComponent } from './tasks-statuses-chart/tasks-statuses-chart.component';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        ProjectsListComponent,
        ProjectFormComponent,
        EmployeesListComponent,
        EmployeeFormComponent,
        CustomersListComponent,
        CustomerFormComponent,
        TeamsListComponent,
        TeamFormComponent,
        TasksListComponent,
        TaskFormComponent,
        ConfirmDialogComponent,
        ErrorDialogComponent,
        ProjectsInfoComponent,
        ProjectsPricesChartComponent,
        TasksStatusesChartComponent,
        RevenueChartComponent,
        TeamsInfoComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxChartsModule
    ],
    providers: [ConfirmDialogService, ErrorDialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }