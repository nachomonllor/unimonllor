import { environment } from '../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../models/user.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-alumnos-listado',
  templateUrl: './alumnos-listado.component.html',
})
export class AlumnosListadoComponent implements OnInit, OnChanges {
  @Input() exam;
  students: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamService
  ) {

  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.exam && changes.exam.currentValue) {

      this.getStudentsByExam();
    }
  }
  getStudentsByExam() {
    debugger
    let aStudents = [];
    this.examService.getStudentsByExam(this.exam).subscribe((data: any) => {
      debugger
      this.students = data;

    });
  }
}
