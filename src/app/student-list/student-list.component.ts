import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student, Subject, StudyYear } from '../models/student.model';
import { max } from 'rxjs';
import { StudentService } from '../student.service';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @Output() studentSelectedEvent = new EventEmitter<Student>();
  selectedStudent?: Student;
  message: string | null = null;

  // public students: Student[] = []
  students: Student[] = []

  constructor(private _studentService: StudentService) {
  }
  ngOnInit(): void {
    // this.students = this._studentsService.getStudents();
    this._studentService.getStudentsInDelay().then(studentList => {
      this.students = studentList
    })
  }



  onEditStudent(student: Student) {
    this.selectedStudent = student
    this.studentSelectedEvent.emit(student);
  }

  onDeleteStudent(studentId: number) {
    // const studentIndex = this.students.findIndex(student => student.id === studentId);
    // if (studentIndex !== -1) {
    //   this.students.splice(studentIndex, 1);
    // }
    this._studentService.deleteStudent(studentId)
  }

  onAddStudent() {
    this.selectedStudent = {
      id: 0,
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      year: StudyYear.first,
      active: true,
      gradePointAverage: 0,
      subject: Subject.undefined,
      exams: [],
      absenceDays: []
    };
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
    // let maxId = this.students.reduce((max, student) => Math.max(max, student.id), 0);
    // student.id = maxId + 1
    // this.students.push(student);

    this._studentService.addStudent(student)
    this.selectedStudent = undefined;
  }

  onSaveEditStudent(student: Student) {
    // let studentToUpdate = this.students.filter(x => x.id == student.id)[0];
    // let studentIndex = this.students.indexOf(studentToUpdate);
    // this.students[studentIndex] = student;

    this._studentService.editStudent(student)
    this.selectedStudent = undefined;

  }

  calcAbsenceDays(studentId: number): number{
    return this._studentService.calcAbsenceDays(studentId)
  }


  onCancel() {
    this.selectedStudent = undefined
  }

}
