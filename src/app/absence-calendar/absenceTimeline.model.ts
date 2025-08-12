export class AbsenceTimeline {
  id?: string;
  userId!: string;
  totalDays!: number;
  takenDays!: number;
  plannedDays!: number;
  absences?: Absence[];
}

export class Absence {
  absenceName?: string;
  startDate!: Date;
  endDate!: Date;
  absenceType!: AbsenceType;

  constructor(absenceName?: string, startDate?: Date, endDate?: Date, absenceType?: AbsenceType) {
    this.absenceName = absenceName;
    this.startDate = startDate || new Date();
    this.endDate = endDate || new Date();
    this.absenceType = absenceType || AbsenceType.Vacation;
  }
}

export enum AbsenceType {
  Vacation,
  SickLeave,
  Other
}