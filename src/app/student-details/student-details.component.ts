import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Student } from '../iterrface/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnChanges, OnInit {
  @Input() student?: Student; 
  @Output() onEdittedStudent: EventEmitter<Student> = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor() {
    this.studentForm = new FormGroup({
      studentId: new FormControl({ value: '', disabled: true }), // Read-only control
      firstName: new FormControl('', { validators: Validators.required, updateOn: 'change' }), // Required field
      lastName: new FormControl('', { validators: Validators.required, updateOn: 'change' }), // Required field
      address: new FormControl('', { validators: Validators.required, updateOn: 'change' }), // Required field
      phone: new FormControl('', { validators: [Validators.required, Validators.pattern(/^\d{10}$/)], updateOn: 'change' }), // Phone validation
      active: new FormControl(false),
      gradePointAverage: new FormControl('', { validators: [Validators.required, Validators.min(0), Validators.max(100)], updateOn: 'change' }), // GPA validation
      leavingDate: new FormControl('')
    });
}

  ngOnInit() {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }

    // Subscribe to changes in the active control
    this.studentForm.get('active')?.valueChanges.subscribe(value => {
      // If active is false, set leavingDate to null or handle accordingly
      if (!value) {
        this.studentForm.get('leavingDate')?.setValue(null);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'] && changes['student'].currentValue) {
      this.studentForm.patchValue(changes['student'].currentValue); // Update form with new student data
      if (this.student?.id !== 0) {
        this.validateFormFields();
      }
    
    }
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
      active: this.studentForm.value.active,
      gradePointAverage: this.studentForm.value.gradePointAverage,
      leavingDate: this.studentForm.value.leavingDate
    };

    this.onEdittedStudent.emit(updatedStudent); // Emit the updated student
    console.log(updatedStudent); // Log the updated student
  }
}
