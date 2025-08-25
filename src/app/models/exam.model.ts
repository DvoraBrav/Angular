
export interface ExamI {
    code: string;
    date: Date;
    description: string;
    grade: number;
}

export class Exam implements ExamI {
    code: string;
    date: Date;
    description: string;
    grade: number;


    constructor(code: string, date: Date, description: string, grade: number) {
        this.code = code;
        this.date = date;
        this.description = description;
        this.grade = grade
    }
}
