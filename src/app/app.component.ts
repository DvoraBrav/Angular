import { Component } from '@angular/core';
import { Student } from './models/student.model';
import { Exam } from './models/exam.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MY APP';
  
  selectedStudent?: Student;
  exams: Exam[] = [];
    
   onStudentSelected(student: Student) {
    this.selectedStudent = student;
    this.exams = student.exams ?? []; 
  }

  getWelcomingAcordingToHour() {
    const hours = new Date().getHours();

    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

}
