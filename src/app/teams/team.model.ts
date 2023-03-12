import { MatTableDataSource } from "@angular/material/table";
import { Employee } from "../employees/employee.model";
import { Project } from "../projects/project.model";

export class Team {
    id?: string;
    name!: string;
    description!: string;
    employees?: Employee[] | MatTableDataSource<Employee>;
    projects?: Project[] | MatTableDataSource<Project>;
}