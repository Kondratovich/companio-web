export class Task {
    id?: string;
    name!: string;
    description!: string;
    status?: TaskStatus;
}

export enum TaskStatus {
    NotStarted,
    InProgress,
    Done
}