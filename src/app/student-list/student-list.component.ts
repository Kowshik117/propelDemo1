import { ActivatedRoute, Router } from '@angular/router';
import { StudentServiceService } from '../student-service.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { student } from 'student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements AfterViewInit {
  originalStudentData: any;
  public dataSource = new MatTableDataSource<any>([]); // <-- STEP (1)
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  constructor(private router: Router, private service: StudentServiceService) {}
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'gender',
    'branch',
    'collegeName',
    'city',
    'actions',
  ];

  goBack() {
    this.router.navigate(['home']);
  }
  ngOnInit(): void {
    this.service.getStudents().subscribe((data) => {
      console.log(data);
      this.originalStudentData = data;
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // <-- STEP (4)
  }

  editStudent(element: any) {
    // this.router.navigate(['edit']);
    // console.log("what?",element);
    // this.service.editData=element;
    this.router.navigate(['/edit'], { queryParams: { stuId: element , key:"Update"} });
  }
  deleteStudent(id: number) {
    this.dataSource = this.originalStudentData.filter(
      (data: any) => data.id !== id
    );

    this.service.deleteStudent(id).subscribe(() => {
      console.log(this.service.getStudents());
      // this.router.navigateByUrl("/home", { skipLocationChange : true}).then(() => {
      //   this.router.navigate(['list'])
      //   alert("refresh")
      // })/
      alert('Deleted Successfully');
      // this.loadData();
    });
  }

  addStudent() {
    this.router.navigate(['addStudent'],{ queryParams: { key:"Add"} });
  }
  private loadData() {
    // Reload data after deletion or perform any necessary actions
    this.service.getStudents().subscribe((data) => {
      this.dataSource = data;
    });
  }
}
