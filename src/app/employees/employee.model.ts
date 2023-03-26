export class Employee {
    id?: string;
    teamId?: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    role?: Role;
    password?: string;
}

export enum Role {
    Administrator,
    Manager,
    Employee
}