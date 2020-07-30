import { UsuarioTablaComponent } from '../../users/usuario-tabla/usuario-tabla.component';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../models/course.model';
import { User } from '../../../../models/user.model';
import { InscriptionService } from '../inscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-listado',
  templateUrl: './inscripcion-listado.component.html',
  styleUrls: ['./inscripcion-listado.component.scss']
})
// Padre de inscripcionListadoComponent
export class InscripcionListadoComponent implements OnInit {
  course: Course;
  students: User[] = [];
  @ViewChild(UsuarioTablaComponent, { static: true }) usuarioTabla: UsuarioTablaComponent;
  showStudent: boolean;
  constructor(private inscriptionService: InscriptionService) {
  }

  ngOnInit(): void {

  }
  onSubmit() {
  }
  courseSelected(evt) {
    debugger
    this.course = evt;
    this.showStudent = true;
    this.getStudentsInscripted(evt.uid);
  }
  getStudentsInscripted(courdeId) {
    debugger
    this.inscriptionService.getStudentsInscripted(courdeId).subscribe((students: User[]) => {
      debugger
      this.students = students;
    });
  }

}
