export class Project {
    id?: string;
    name!: string;
    description!: string;
    price?: number;
    dateAdded?: Date;
    deadline!: Date;
    customerId?: string;
    teamId?: string;
}