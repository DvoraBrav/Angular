export interface AbsenceDaysI {
    absenceStartDate: Date,
    absenceDays: number
}

export class AbsenceDays implements AbsenceDaysI {
  absenceStartDate: Date;
  absenceDays: number

  constructor(absenceStartDate: Date, absenceDays: number) {
      this.absenceStartDate = absenceStartDate; 
      this.absenceDays = absenceDays;
  }
}