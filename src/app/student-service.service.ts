import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from 'student';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  url : string = 'http://localhost:3004';
  editData: any;
  constructor(private http: HttpClient, ) { }
 addStudentData(student: student) : Observable< any>{

return this.http.post(this.url + '/students',student)
 }
 getStudents() : Observable<any> {
  return this.http.get(this.url + '/students', {responseType: 'json'})
}

deleteStudent(id: any) : Observable<any> {
  return this.http.delete(this.url + '/students/' + id, {responseType: 'json'} )
}

  // Get student By Id as parameter 
  getStudentById(id: Number) : Observable<any> {
    return this.http.get(this.url + '/students/' + id, {responseType: 'json'})
  }
   // Update the Student 
   updateStudent(student:any) : Observable<any> {
 
    return this.http.put(this.url + '/students/' + student.id, student)
  }
} 

