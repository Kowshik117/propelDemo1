import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const myRoutes: Routes =[
  {path: '', component : StudentEditComponent}
 
  ]

@NgModule({
  declarations: [
    
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule, 
    RouterModule.forChild(myRoutes)
  ]
})
export class EditStudentModule { }
