import { User } from './../../../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../../models/course.model';
import { TeacherCourseService } from '../teacherCourse.service';
import { Observable } from 'rxjs';
import { UsuarioTablaComponent } from '../../../admin/users/usuario-tabla/usuario-tabla.component';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  courses: Course[] = [];
  course: Course;
  students: User[] = [];
  @ViewChild(UsuarioTablaComponent, { static: true }) usuarioTabla: UsuarioTablaComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherCourseService: TeacherCourseService
  ) {}
  ngOnInit() {
    this.teacherCourseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  onDelete(id) {

  }

  courseSelected(evt) {
    if (this.usuarioTabla) {
      this.usuarioTabla.deselectAll();
    }
    this.course = evt;
  }
}
