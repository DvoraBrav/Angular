import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from './student.service';
import { ExamListComponent } from './exam-list/exam-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailsComponent,
    ExamListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
