import { Component } from '@angular/core';
import { Student, Subject, StudyYear } from '../models/student.model';
import { max } from 'rxjs';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  selectedStudent?: Student;
  message: string | null = null;

  public students: Student[] = [
    {
      id: 1,
      firstName: 'Avraham',
      lastName: 'Cohen',
      address: 'aaaa',
      phone: '0578579525',
      year: StudyYear.first,
      active: true,
      gradePointAverage: 90,
      subject: Subject.computer
    },
    {
      id: 2,
      firstName: 'Shalom',
      lastName: 'Levi',
      address: 'bbbb',
      phone: '0598759850',
      year: StudyYear.second,
      active: true,
      gradePointAverage: 98,
      subject: Subject.english
    },
    {
      id: 3,
      firstName: 'Daniel',
      lastName: 'Levi',
      address: 'cccc',
      phone: '0598759850',
      year: StudyYear.third,
      active: false,
      gradePointAverage: 68,
      leavingDate: new Date("2023-06-15"),
      subject: Subject.math
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
    this.selectedStudent = { id: 0, firstName: '', lastName: '', address: '', phone: '', year: StudyYear.first, active: true, gradePointAverage: 0, subject: Subject.undefined };
  }

  onEditOrAddStudent(student: Student) {
    if (student.id == 0) {
      this.onSaveAddStudent(student);
      this.message = 'User added successfully';
    } else {
      this.onSaveEditStudent(student);
      this.message = 'Changes saved';
    }

    setTimeout(() => {
      this.message = null;
    }, 2000); // Duration in milliseconds
  }
  onSaveAddStudent(student: Student) {
    let maxId = this.students.reduce((max, student) => Math.max(max, student.id), 0);
    student.id = maxId + 1
    this.students.push(student);
    this.selectedStudent = undefined;
  }

  onSaveEditStudent(student: Student) {
    let studentToUpdate = this.students.filter(x => x.id == student.id)[0];
    let studentIndex = this.students.indexOf(studentToUpdate);
    this.students[studentIndex] = student;

    this.selectedStudent = undefined;

  }



  onCancel() {
    this.selectedStudent = undefined
  }

}
