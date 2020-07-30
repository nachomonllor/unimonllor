import { UsuarioTablaComponent } from './../../users/usuario-tabla/usuario-tabla.component';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../models/course.model';
import { User } from '../../../../models/user.model';
import { InscriptionService } from '../inscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-alta',
  templateUrl: './inscripcion-alta.component.html',
  styleUrls: ['./inscripcion-alta.component.scss']
})
// Padre de inscripcionListadoComponent
export class InscripcionAltaComponent implements OnInit {
  course: Course;
  @ViewChild(UsuarioTablaComponent, { static: true }) usuarioTabla: UsuarioTablaComponent;

  constructor(private inscriptionService: InscriptionService) {
  }

  ngOnInit(): void {

  }
  onSubmit() {
  }
  courseSelected(evt) {
    this.usuarioTabla.deselectAll();
    this.course = evt;
  }
  userSelected(evt) {
    const inscription = {
      course: this.course,
      student: evt
    }
    if (evt.selected) {
      this.inscriptionService.saveInscription(inscription).then(resp => {
        Swal.fire({
          title: 'Atención',
          text: 'El alumno ha sido inscripto en la materia',
          icon: 'error',
          showConfirmButton: true,
          timer: 2000,
          animation: true,
        });
      });
    }
  }
}
