export class Task {
  id?: string;
  projectId?: string;
  name!: string;
  description!: string;
  status?: TaskStatus;
}

export enum TaskStatus {
  NotStarted,
  InProgress,
  Done
}