import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Student, Subject, StudyYear } from '../models/student.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnChanges, OnInit {
  @Input() student?: Student;
  @Output() onEdittedStudent: EventEmitter<Student> = new EventEmitter<Student>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  studentForm: FormGroup;
  subjects = Object.values(Subject); // Get enum values
  StudyYear = StudyYear;

  constructor() {
    this.studentForm = new FormGroup({
      studentId: new FormControl({ value: '', disabled: true }), // Read-only control
      firstName: new FormControl('', { validators: Validators.required, updateOn: 'change' }), // Required field
      lastName: new FormControl('', { validators: Validators.required, updateOn: 'change' }), // Required field
      address: new FormControl('', { validators: [Validators.required, Validators.minLength(4)], updateOn: 'change' }), // Required field
      phone: new FormControl('', { validators: [Validators.required, Validators.pattern(/^\d{10}$/)], updateOn: 'change' }), // Phone validation
      year: new FormControl('', { validators: Validators.required, updateOn: 'change' }),
      active: new FormControl(false),
      gradePointAverage: new FormControl('', { validators: [Validators.required, Validators.min(0), Validators.max(100)], updateOn: 'change' }), // Average validation
      leavingDate: new FormControl(''),
      subject: new FormControl('', { validators: Validators.required, updateOn: 'change' })
    });

  }

  // Custom validator to require leavingDate if active is false
  requiredIfInactive(control: AbstractControl): { [key: string]: any } | null {
    const active = this.studentForm.get('active')?.value;
    return !active && !control.value ? { required: true } : null;
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'] && this.student) {
      this.studentForm.patchValue(this.student);
    }

    // Subscribe to changes in the active control
    this.studentForm.get('active')?.valueChanges.subscribe(value => {
      // If active is false, set leavingDate to null or handle accordingly
      if (!value) {
        this.studentForm.get('leavingDate')?.setValue(null);
      }
    });

    if (changes['student'] && changes['student'].currentValue) {
      this.studentForm.patchValue(changes['student'].currentValue); // Update form with new student data
      if (this.student?.id !== 0) {
        this.validateFormFields();
      }
    }

    // console.log(this.studentForm.controls);

  }

  private validateFormFields() {
    const validationRules = {
      gradePointAverage: (value: number) => value < 0 || value > 4,
      phone: (value: string) => !/^\d{10}$/.test(value),
      firstName: (value: string) => !value,
      lastName: (value: string) => !value,
      address: (value: string) => !value,
    } as const; // Use 'as const' to infer literal types

    Object.keys(validationRules).forEach(field => {
      const control = this.studentForm.get(field as keyof typeof validationRules); // Type assertion here
      if (control) {
        control.setErrors({ invalid: true });
        control.markAsTouched();
      }
    });
  }

  doneEditOrAdd() {
    // Create a new student object from the form values
    const updatedStudent: Student = {
      id: this.student ? this.student.id : 0, // Use existing ID or set to 0 for new student
      firstName: this.studentForm.value.firstName,
      lastName: this.studentForm.value.lastName,
      address: this.studentForm.value.address,
      phone: this.studentForm.value.phone,
      year: this.studentForm.value.year,
      active: this.studentForm.value.active,
      gradePointAverage: this.studentForm.value.gradePointAverage,
      leavingDate: this.studentForm.value.leavingDate,
      subject: this.studentForm.value.subject
    };


    this.onEdittedStudent.emit(updatedStudent); // Emit the updated student
  }

  cancel() {
    this.onCancel.emit()
    // this.router.navigate(['/your-desired-route']); // Replace with your desired route
  }
}
