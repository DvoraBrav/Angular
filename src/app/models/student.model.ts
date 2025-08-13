
export interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  year: StudyYear;
  gradePointAverage: number;
  subject?: Subject;
  active: boolean;
  leavingDate?: Date;
}

export class Student implements StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  year: StudyYear;
  gradePointAverage: number;
  subject: Subject;
  active: boolean;
  leavingDate?: Date;

  constructor(firstName: string, lastName: string, subject: Subject) {
      this.id = 0; // or any default value
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = '';
      this.phone = '';
      this.year = StudyYear.first
      this.gradePointAverage = 0; // or any default value
      this.subject = subject;
      this.active = true; // or any default value
      this.leavingDate = undefined; // or any default value
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


