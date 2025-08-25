import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Exam } from '../models/exam.model';
import { StudentService } from '../student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html'
})
export class ExamListComponent implements OnChanges {
  @Input() exams: Exam[] = [];
  @Input() student?: Student;
  average: number = 0

  /**
   *
   */
  constructor(private _studentService: StudentService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      this.average = this._studentService.getAvg(this.student.id)
    }

  }

}
