  import { Component } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { StudentServiceService } from '../student-service.service';
  import { student } from 'student';

  @Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.css']
  })
  export class AddStudentComponent {

    public registrationForm!: FormGroup;
    public studentTableData: any;
    public index= true;

    branchList: string[] = ['CIVIL ENGINEERING', 'CSE', 'ME', 'ECE', 'EEE'];

  constructor( private fb: FormBuilder, private router : Router, private service: StudentServiceService){

  }

  
    ngOnInit(): void {
      this.registrationForm = this.fb.group({
        studentId: new FormControl(null,[Validators.required]),
        studentName : new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        branch: new FormControl(null, [Validators.required]),
        collegeName : new FormControl(null, Validators.required),
        city : new FormControl(null, [Validators.required])
        
        
      })
      this.service.getStudents().subscribe(stdata=>{
        this.studentTableData=stdata;
      })
     }

    goBack(){
  this.router.navigate(['home'])
    }
    addStudent(){

      const newStudentId = this.registrationForm.controls['studentId'].value;
      const isDuplicate =this.studentTableData.some((i: any)=>
      i.studentId===newStudentId
      
    )
console.log(isDuplicate);
    if (isDuplicate) {
      alert("Student ID already exists. Please use a different Student ID.");
    }
    else{
      
      const studentData : student ={
        studentId: newStudentId,
        studentName: this.registrationForm.controls['studentName'].value,
        gender: this.registrationForm.controls['gender'].value,
        branch: this.registrationForm.controls['branch'].value,
        collegeName: this.registrationForm.controls['collegeName'].value,
        city: this.registrationForm.controls['city'].value
  
      }
      console.log(studentData)
      this.service.addStudentData(studentData).subscribe(data=>{
        console.log(data);

      })
      alert("Successfully Added");
      this.registrationForm.reset();
    }
     
    
   
    }
  
  }
