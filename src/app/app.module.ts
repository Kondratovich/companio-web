import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { TasksStatusesChartComponent } from './tasks-statuses-chart/tasks-statuses-chart.component';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';
import { LoginComponent } from './login/login.component';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AppMaterialModule } from './shared/modules/app.material.module';
import { httpInterceptorsProviders } from './shared/http-interceptors-provider';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { TasksManagementComponent } from './tasks-management/tasks-management.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoComponent } from './absence-calendar/absence-calendar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
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
        TasksManagementComponent,
        ProjectsInfoComponent,
        ProjectsPricesChartComponent,
        TasksStatusesChartComponent,
        RevenueChartComponent,
        TeamsInfoComponent,
        AdminNavbarComponent,
        ManagerNavbarComponent,
        EmployeeNavbarComponent,
        HeaderComponent,
        ErrorDialogComponent,
        ConfirmDialogComponent,
        NotFoundComponent,
        DemoComponent,
        StartPageComponent,
        WelcomeComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxChartsModule,
        JwtModule,
        AppMaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ],
    providers: [
        ConfirmDialogService,
        ErrorDialogService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        httpInterceptorsProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }