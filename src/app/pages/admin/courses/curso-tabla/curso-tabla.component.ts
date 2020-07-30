import { environment } from '../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../../models/course.model';
import { CourseService } from '../course.service';
import { User } from '../../../../models/user.model';
@Component({
  selector: 'app-curso-tabla',
  templateUrl: './curso-tabla.component.html',
  styleUrls: ['./curso-tabla.component.scss']
})
export class CursoTablaComponent implements OnInit {
  dataSource: MatTableDataSource<Course>;
  @Output() courseSelected = new EventEmitter();
  selectedRowIndex: any;
  displayedColumns: string[] = [
    'img',
    'name',
    'capacity',
    'period',
    'year',
    'teacher',
    'actions',
  ];
  url: string;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {

  }
  ngOnInit() {
    this.courseService.getCourses().subscribe((documents) => {
      let courses: Course[] = [];
      documents.forEach((doc: any, key: number) => {
        // const data = doc.payload.doc.data();
        courses.push({
          index: key + 1,
          uid: doc.uid,
          name: doc.name,
          period: doc.period,
          capacity: doc.capacity,
          year: doc.year,
          teacher: doc.teacher,
          img: doc.img
        });
      });
      this.dataSource = new MatTableDataSource<Course>(courses);
    });
  }
  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de eliminar un curso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // this._httpService.delete<User>(`${this.url}/${id}`).subscribe(
        //   () => {
        //     Swal.fire(
        //       'Atención :)',
        //       'El curso ha sido eliminado',
        //       'success',
        //     );
        //     this.ngOnInit();
        //   },
        //   (err) => {
        //     console.log(err);
        //     Swal.fire({
        //       title: 'Error',
        //       text: err.error.message,
        //       icon: 'error',
        //       showConfirmButton: false,
        //       timer: 2000,
        //       animation: false,
        //     });
        //   },
        // );
      }
    });
  }
  onSearchClear() {
    if (this.input.nativeElement.value.length > 0) {
      this.input.nativeElement.value = '';
      this.ngOnInit();
    }
  }
  highlight(row){
    this.selectedRowIndex = row.index;
    this.courseSelected.emit(row);
  }
}
