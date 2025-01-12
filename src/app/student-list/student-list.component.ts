import { Component } from '@angular/core';
import { Student } from '../iterrface/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  public students: Student[] = [
    {
      id: 1,
      firstName: 'Avraham',
      lastName: 'Cohen',
      address: 'aa',
      phone: '057857952',
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
  ];

  onDeleteStudent(studentId: number) {
    const index = this.students.findIndex(student => student.id === studentId);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }

}
