import { Injectable } from "@angular/core";
import { Student, StudyYear, Subject } from "./models/student.model";
import { Exam } from "./models/exam.model";
import { AbsenceDays } from "./models/absenceDays.model";

@Injectable()
export class StudentService {

    // private students: Student[] = [
    //     new Student("Yosef", "Levi", Subject.computer),
    //     new Student("Miriam", "Cohen", Subject.math),
    //     new Student("David", "Goldstein", Subject.english),
    //     new Student("Sara", "Katz", Subject.computer),
    //     // new Student(id: 1, firstName:"")
    // ];
    private _students = [
        new Student({
            id: 1,
            firstName: "Avraham",
            lastName: "Cohen",
            address: "aaaa",
            phone: "0578579525",
            year: StudyYear.first,
            active: true,
            gradePointAverage: 90,
            subject: Subject.computer,
            exams: [new Exam("12", new Date("2023-08-15"), "Math", 100)],
            absenceDays: [new AbsenceDays(new Date("2024-09-04"), 2), new AbsenceDays(new Date("2025-07-04"), 3)]
        }),
        new Student({
            id: 2,
            firstName: 'Shalom',
            lastName: 'Levi',
            address: 'bbbb',
            phone: '0598759850',
            year: StudyYear.second,
            active: true,
            gradePointAverage: 98,
            subject: Subject.english,
            // exams: [],
            absenceDays: []
        }),
        new Student({
            id: 3,
            firstName: 'Daniel',
            lastName: 'Levi',
            address: 'cccc',
            phone: '0598759850',
            year: StudyYear.third,
            active: false,
            gradePointAverage: 68,
            leavingDate: new Date("2023-06-15"),
            subject: Subject.math,
            // exams: [],
            absenceDays: []
        })
    ]


    getStudents(): Student[] {
        return this._students
    }

    getStudentsInDelay(): Promise<Student[]> {
        return new Promise((res, rej) => {
            // setTimeout(() => {
            res(this._students)
            // }, 1000);
        })

    }

    addStudent(student: Student): void {
        let maxId = this._students.reduce((max, student) => Math.max(max, student.id), 0);
        student.id = maxId + 1;
        this._students.push(student);
    }

    editStudent(student: Student): void {
        let studentToUpdate = this._students.filter(x => x.id == student.id)[0];
        let studentIndex = this._students.indexOf(studentToUpdate);
        this._students[studentIndex] = student;
    }

    deleteStudent(studentId: number): void {
        const studentIndex = this._students.findIndex(student => student.id === studentId);
        if (studentIndex !== -1) {
            this._students.splice(studentIndex, 1);
        }
    }

    getAvg(studentId: number): number {
        const studentIndex = this._students.findIndex(student => student.id === studentId)
        const exams = this._students[studentIndex].exams ?? []
        let avgSum = 0
        for (const exam of exams) {
            avgSum += exam.grade
        }

        // return allExams.length > 0 ? avg / allExams.length : 0
        if (exams.length > 0) {
            const average = avgSum / exams.length
            this._students[studentIndex].gradePointAverage = average
            return average
        }
        else {
            return 0
        }
    }

    addAbsence(student: Student, startDate: Date, numberOfDays: number): Promise<void> {
        return new Promise(res => {
            student.absenceDays.push(new AbsenceDays(startDate, numberOfDays))
            res()
        })
    }

    calcAbsenceDays(studentId: number): number {
        const studentIndex = this._students.findIndex(student => student.id === studentId)
        const absenseces = this._students[studentIndex].absenceDays ?? []
        let absSum = 0
        for (const abs of absenseces) {
            absSum += abs.absenceDays
        }

        return absSum
    }

}