import { UsuarioTablaComponent } from './../../users/usuario-tabla/usuario-tabla.component';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../models/course.model';
import { User } from '../../../../models/user.model';
import { InscriptionService } from '../inscription.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-inscripcion-alta',
  templateUrl: './inscripcion-alta.component.html',
  styleUrls: ['./inscripcion-alta.component.scss']
})
// Padre de inscripcionListadoComponent
export class InscripcionAltaComponent implements OnInit {
  student: User;
  course: Course;
  @ViewChild(UsuarioTablaComponent, { static: true }) usuarioTabla: UsuarioTablaComponent;

  constructor(
    public authService: AuthService,
    private inscriptionService: InscriptionService) {
  }

  ngOnInit(): void {

  }
  onSubmit() {
    debugger
    const inscription = {
      course: this.course,
      student: this.student
        ? this.student
        : this.authService.user
    }
    this.inscriptionService.saveInscription(inscription).then(resp => {
      Swal.fire({
        title: 'Atención',
        text: 'El alumno ha sido inscripto en la materia',
        icon: 'success',
        showConfirmButton: true,
        timer: 2000,
        animation: true,
      });
    });
  }
  courseSelected(evt) {
    if (this.usuarioTabla) {
      this.usuarioTabla.deselectAll();
    }
    this.course = evt;
  }
  userSelected(evt) {
    this.student = evt;
    if (evt.selected) {
      this.onSubmit();
    }
  }
}
