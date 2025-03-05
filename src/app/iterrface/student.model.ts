export interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  active: boolean;
  gradePointAverage: number;
  leavingDate?: Date;
}

export class Student implements StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  active: boolean;
  gradePointAverage: number;
  leavingDate?: Date;

  constructor(firstName: string, lastName: string) {
      this.id = 0; // or any default value
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = '';
      this.phone = '';
      this.active = true; // or any default value
      this.gradePointAverage = 0; // or any default value
      this.leavingDate = undefined; // or any default value
  }
}


