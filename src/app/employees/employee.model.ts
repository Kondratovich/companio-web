export class Employee {
    id?: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    role?: Role;
}

export enum Role {
    Admin,
    Manager,
    Employee
}