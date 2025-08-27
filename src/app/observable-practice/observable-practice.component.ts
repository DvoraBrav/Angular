import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { interval, Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { from, map, filter } from 'rxjs';

@Component({
  selector: 'app-observable-practice',
  templateUrl: './observable-practice.component.html',
})
export class ObservablePracticeComponent {

  studentEmail: string = "studentMail@a.com"
  emailMessages: string[] = [];

  students: Student[]
  studentsObs: Observable<string> = new Observable((obs => {
    for (const student of this.students) {
      obs.next(student.firstName + " " + student.lastName)
    }
  }))
  studentObs2: Observable<string>

  showTime: string = "";
  timer1: Observable<string> = new Observable((obs) => {
    setInterval(() => {
      obs.next(new Date().toLocaleTimeString())
    }, 1000)
  })

  showTime2: string = "";
  timer2: Observable<string> = interval(1000).pipe(map(x => { return new Date().toLocaleTimeString() }))

  sendEmail1: Observable<string> = new Observable((obs) => {
    for (const student of this.students) {
      if (student.active) {
        obs.next("Email sent to " + this.studentEmail + " " + student.firstName + " " + student.lastName)
      }
    }
  })

  sendEmail2: Observable<string> //= from(this.students).pipe(


  constructor(private _studentService: StudentService) {
    this.students = this._studentService.getStudents()

    this.studentsObs.subscribe((studentName) => {
      console.log("1 - Student Name is: " + studentName);
    })

    this.studentObs2 = from(this.students).pipe(map((s: Student) => { return s.firstName + " " + s.lastName }))
    this.studentObs2.pipe().subscribe((studentName) => {
      console.log("2 - Student Name is: " + studentName);
    })


    this.timer1.subscribe(s => { this.showTime = s })

    this.timer2.subscribe(s => { this.showTime2 = s })


    this.sendEmail2 = from(this.students).pipe(
      filter((student: Student) => student.active),
      map((student: Student) => "Email sent to " + this.studentEmail + " " + student.firstName + " " + student.lastName)
    )
    // this.sendEmail2.subscribe(m => { alert(m) })
  }

  sendEmails1() {
    this.sendEmail1.subscribe(m => {
      this.emailMessages.push(m); // Add the message to the emailMessages array
      // alert(m)
    })
  }

  sendEmails2() {
    this.sendEmail2.subscribe(m => {
      this.emailMessages.push(m); // Add the message to the emailMessages array
      // alert(m);
    });
  }
}
