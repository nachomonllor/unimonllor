import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Course } from '../../../../models/course.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { User } from '../../../../models/user.model';
import { CourseService } from '../course.service';
@Component({
  selector: 'app-curso-alta',
  templateUrl: './curso-alta.component.html',
  styleUrls: ['./curso-alta.component.scss']
})
// Padre de CursoListadoComponent
export class CursoAltaComponent implements OnInit {
  teacher: User;
  form: FormGroup;
  constructor(
    private router: Router,
    private courseService: CourseService,
    private storage: AngularFireStorage
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {

  }
  onSubmit() {
    const payload: Course = {teacher: this.teacher.uid, ...this.form.value};
    this.courseService.saveCourse(payload).then(data => {
      Swal.fire({
        title: 'Atención',
        text: 'El curso ha sido guardado',
        icon: 'success',
        showConfirmButton: true,
        timer: 2000,
        animation: true,
      });
      this.router.navigate(['/courses/list']);
    }).catch(err => {
      Swal.fire(
        'Error',
        `:: ${err}`,
        'error'
      );
    });
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      period: new FormControl(null, Validators.required),
      capacity: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
    });
  }
  handleEdit(evt) {
    this.teacher = evt;
  }
}
