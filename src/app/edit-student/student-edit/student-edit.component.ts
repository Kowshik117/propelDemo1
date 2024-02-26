import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServiceService } from 'src/app/student-service.service';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent {
  public registrationForm!: FormGroup;
  public studentTableData: any;
  public index = true;
  public students: any;
  public editStuData: any;
  public studentId: any;

  branchList: string[] = ['CIVIL ENGINEERING', 'CSE', 'ME', 'ECE', 'EEE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: StudentServiceService,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.aRoute.snapshot.params['id'];
    this.service.getStudentById(id).subscribe( (data) => {
      this.editStuData =  data;
      console.log(this.editStuData);
      //patching the values to form
      this.registrationForm.patchValue(this.editStuData);
    });

    this.registrationForm = this.fb.group({
      studentId: new FormControl(this.editStuData?.studentId, [
        Validators.required,
      ]),
      studentName: new FormControl(this.editStuData?.studentName, [
        Validators.required,
      ]),
      gender: new FormControl(this.editStuData?.gender, [Validators.required]),
      branch: new FormControl(this.editStuData?.branch, [Validators.required]),
      collegeName: new FormControl(
        this.editStuData?.collegeName,
        Validators.required
      ),
      city: new FormControl(this.editStuData?.city, [Validators.required]),
    });
  }

  goBack() {
    this.router.navigate(['home']);
  }
  editStudent() {
    let formData = this.registrationForm.getRawValue()
    let saveEditData =     {
      "id": this.editStuData.id,
      "studentId":formData.studentId ,
      "studentName": formData.studentName,
      "gender": formData.gender,
      "branch": formData.branch,
    "collegeName": formData.collegeName,
      "city": formData.city
    }
    this.service.updateStudent(saveEditData).subscribe((data)=> {
      console.log("Updated",data);
      this.router.navigate(['list'])
    })
  }
}
