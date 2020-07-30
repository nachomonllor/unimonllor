import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioTablaComponent } from '../../../admin/users/usuario-tabla/usuario-tabla.component';
import { User } from '../../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';
import { Course } from '../../../../models/course.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-alta',
  templateUrl: './examen-alta.component.html',
  styleUrls: ['./examen-alta.component.scss']
})
export class ExamenAltaComponent implements OnInit {
  student: User;
  course: Course;
  form: FormGroup;
  dateExam: Date;
  note: number;
  constructor(private examService: ExamService) {
    this.createFormGroup();
  }
  ngOnInit(): void {
  }
  handleCourseSelected($event) {
    this.course = $event;
    this.student = null;
  }
  handleUserSelected($event) {
    this.student = $event;
  }
  onSubmit() {
    this.examService.saveExam({
      student: this.student,
      course: this.course,
      dateExam: this.form.value.dateExam.format('DD/MM/YYYY'),
      note: this.form.value.note
    }).then(resp => {
      Swal.fire({
        title: 'Atención',
        text: 'El examen ha sido guardado',
        icon: 'success',
        showConfirmButton: true,
        timer: 2000,
        animation: true,
      });
      this.form.reset();
      this.student = null;
    });
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      dateExam: new FormControl(null, Validators.required),
      note: new FormControl(
        null,
        [Validators.required, Validators.min(1), Validators.max(10)]
      )
    });
  }
}
