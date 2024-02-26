import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentServiceService } from './student-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AddStudentComponent } from './add-student/add-student.component';

//angualr material imports
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { StudentListComponent } from './student-list/student-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { studentInterceptor } from './student-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
   StudentListComponent,
    AddStudentComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, 
    MatTableModule,
     MatIconModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     MatRadioModule,
     MatSelectModule,
     MatFormFieldModule
 
  ],
  providers: [StudentServiceService , {
    provide : HTTP_INTERCEPTORS, useClass:studentInterceptor ,multi:true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
