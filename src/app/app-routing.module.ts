import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'addStudent', component:AddStudentComponent},
  {path: 'header', component:HeaderComponent},
    {path: 'list', component:StudentListComponent},
    {
      path: 'edit/:id', loadChildren: () => import('../app/edit-student/edit-student.module')
      .then(m => m.EditStudentModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
