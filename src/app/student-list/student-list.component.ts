import { Component } from '@angular/core';
import { Student } from '../iterrface/student.model';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  selectedStudent?: Student;

  public students: Student[] = [
    {
      id: 1,
      firstName: 'Avraham',
      lastName: 'Cohen',
      address: 'aa',
      phone: '0578579525',
      active: true,
      gradePointAverage: 90
    },
    {
      id: 2,
      firstName: 'Shalom',
      lastName: 'Levi',
      address: 'bb',
      phone: '0598759850',
      active: true,
      gradePointAverage: 98
    },
    {
      id: 3,
      firstName: 'Daniel',
      lastName: 'Levi',
      address: 'cc',
      phone: '0598759850',
      active: false,
      gradePointAverage: 68,
      leavingDate: new Date("2023-06-15")
    },
  ];

  onEditStudent(student: Student) {
    this.selectedStudent = student
  }

  onDeleteStudent(studentId: number) {
    const studentIndex = this.students.findIndex(student => student.id === studentId);
    if (studentIndex !== -1) {
      this.students.splice(studentIndex, 1);
    }
  }

  onAddStudent() {
    this.selectedStudent = { id: 0, firstName: '', lastName: '', address: '', phone: '', active: true, gradePointAverage: 0};
  }

  onEditOrAddStudent(student: Student) {
    if (student.id == 0) {
      this.onSaveAddStudent(student);
  } else {
      this.onSaveEditStudent(student);
  }
  }
  onSaveAddStudent(student: Student) {
    this.students.push(student);
    this.selectedStudent = undefined;
    
  }

  onSaveEditStudent(student: Student) {
    let studentToUpdate = this.students.filter(x => x.id == student.id)[0];
    let studentIndex = this.students.indexOf(studentToUpdate);
    this.students[studentIndex] = student;
    
    this.selectedStudent = undefined;

  }

}
