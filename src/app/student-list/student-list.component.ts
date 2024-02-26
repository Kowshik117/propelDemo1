import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  
constructor( private router : Router, private service: StudentServiceService){

}
  displayedColumns: string[] = ['studentId', 'studentName', 'gender', 'branch', 'collegeName','city', 'actions'];
  dataSource : any;


  goBack(){
this.router.navigate(['home']);
  }
 ngOnInit(): void{
  this.service.getStudents().subscribe(data=>{
    console.log(data);
    this.dataSource=data;
  })
 }

 editStudent(element: any){
  // this.router.navigate(['edit']);
  // console.log("what?",element);
  // this.service.editData=element;
  this.router.navigate(['edit/' +element])
 }
 deleteStudent(id: number){
  this.dataSource = this.dataSource.filter((data:any) => data.id !== id);

   this.service.deleteStudent(id).subscribe(()=>{
console.log(this.service.getStudents())
    // this.router.navigateByUrl("/home", { skipLocationChange : true}).then(() => {
    //   this.router.navigate(['list'])
    //   alert("refresh")
    // })/
    alert("Deleted Successfully");
    // this.loadData(); 
   });
   
    
   
 }
 
 addStudent(){
  this.router.navigate(['addStudent']);
  
    }
    private loadData() {
      // Reload data after deletion or perform any necessary actions
      this.service.getStudents().subscribe((data) => {
        this.dataSource = data;
      })
    }
    
}
