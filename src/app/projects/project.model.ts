import { MatTableDataSource } from "@angular/material/table";
import { Task } from "../tasks/task.model";

export class Project {
    id?: string;
    teamId!: string;
    customerId!: string;
    name!: string;
    description!: string;
    price!: number;
    dateAdded?: Date;
    deadline!: Date;
    tasks?: Task[] | MatTableDataSource<Task>;
}