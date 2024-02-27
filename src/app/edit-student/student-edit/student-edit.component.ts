import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServiceService } from 'src/app/student-service.service';
import { student } from 'student';

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
  public butn: any;

  branchList: string[] = ['CIVIL ENGINEERING', 'CSE', 'ME', 'ECE', 'EEE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: StudentServiceService,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.aRoute.snapshot.queryParamMap.get('stuId');
    let key = this.aRoute.snapshot.queryParamMap.get('key');
    console.log(key);
    this.butn = key;
    if (key === 'Update') {
      console.log('test', typeof id);
      this.service.getStudentById(Number(id)).subscribe((data) => {
        this.editStuData = data;
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
        gender: new FormControl(this.editStuData?.gender, [
          Validators.required,
        ]),
        branch: new FormControl(this.editStuData?.branch, [
          Validators.required,
        ]),
        collegeName: new FormControl(
          this.editStuData?.collegeName,
          Validators.required
        ),
        city: new FormControl(this.editStuData?.city, [Validators.required]),
      });
    } else {
      this.registrationForm = this.fb.group({
        studentId: new FormControl(null, [Validators.required]),
        studentName: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        branch: new FormControl(null, [Validators.required]),
        collegeName: new FormControl(null, Validators.required),
        city: new FormControl(null, [Validators.required]),
      });
      this.service.getStudents().subscribe((stdata) => {
        this.studentTableData = stdata;
      });
    }
  }

  goBack() {
    this.router.navigate(['home']);
  }
  buttonClick() {
    if (this.butn === 'Update') {
      this.editStudent();
    } else {
      this.addStudent();
    }
  }
  editStudent() {
    let formData = this.registrationForm.getRawValue();
    let saveEditData = {
      id: this.editStuData.id,
      studentId: formData.studentId,
      studentName: formData.studentName,
      gender: formData.gender,
      branch: formData.branch,
      collegeName: formData.collegeName,
      city: formData.city,
    };
    this.service.updateStudent(saveEditData).subscribe((data) => {
      console.log('Updated', data);
      alert('Updated Successfully..!');
      this.router.navigate(['list']);
    });
  }

  addStudent() {
    const newStudentId = this.registrationForm.controls['studentId'].value;
    const isDuplicate = this.studentTableData.some(
      (i: any) => i.studentId === newStudentId
    );
    console.log(isDuplicate);
    if (isDuplicate) {
      console.log('duplicate')
      alert('Student ID already exists. Please use a different Student ID.');
    } else {
      const studentData: student = {
        studentId: newStudentId,
        studentName: this.registrationForm.controls['studentName'].value,
        gender: this.registrationForm.controls['gender'].value,
        branch: this.registrationForm.controls['branch'].value,
        collegeName: this.registrationForm.controls['collegeName'].value,
        city: this.registrationForm.controls['city'].value,
      };
      console.log(studentData);
      this.service.addStudentData(studentData).subscribe((data) => {
        console.log(data);
      });
      alert('Successfully Added');
      this.registrationForm.reset();
    }
  }
}
