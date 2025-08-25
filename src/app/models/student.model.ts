import { AbsenceDays } from "./absenceDays.model";
import { Exam } from "./exam.model";

export interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  year: StudyYear;
  gradePointAverage: number;
  subject?: Subject;
  exams?: Exam[]
  active: boolean;
  leavingDate?: Date;
}

// export class Student implements StudentInterface {
//   id: number;
//   firstName: string;
//   lastName: string;
//   address: string;
//   phone: string;
//   year: StudyYear;
//   gradePointAverage: number;
//   subject: Subject;
//   exams?: Exam[];
//   active: boolean;
//   leavingDate?: Date;
//   // absenceDays: AbsenceDays[];


//   constructor(firstName: string, lastName: string, subject: Subject) {
//       this.id = 0; // or any default value
//       this.firstName = firstName;
//       this.lastName = lastName;
//       this.address = '';
//       this.phone = '';
//       this.year = StudyYear.first
//       this.gradePointAverage = 0; // or any default value
//       this.subject = subject;
//       this.exams = []
//       this.active = true; // or any default value
//       this.leavingDate = undefined; // or any default value
//       // this.absenceDays = []
//   }
// }
export class Student implements StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  subject: Subject;
  address: string;
  phone: string;
  year: StudyYear;
  gradePointAverage: number;
  exams?: Exam[];
  active: boolean;
  leavingDate?: Date;
  absenceDays: AbsenceDays[];

  constructor(data: {
    firstName: string,
    lastName: string,
    subject: Subject,
    id?: number,
    address?: string,
    phone?: string,
    year?: StudyYear,
    active?: boolean,
    gradePointAverage?: number,
    leavingDate?: Date,
    exams?: Exam[],
    absenceDays?: AbsenceDays[]
  }) {
    this.id = data.id ?? 0;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.address = data.address ?? "";
    this.phone = data.phone ?? "";
    this.year = data.year ?? StudyYear.first;
    this.active = data.active ?? true;
    this.gradePointAverage = data.gradePointAverage ?? 0;
    this.subject = data.subject;
    this.leavingDate = data.leavingDate;
    this.exams = data.exams,
    this.absenceDays = data.absenceDays || []
  }
}





export enum Subject {
  computer = 'Computer',
  math = 'Math',
  english = 'English',
  undefined = ''
}

export enum StudyYear {
  first = '1',
  second = '2',
  third = '3',
}


