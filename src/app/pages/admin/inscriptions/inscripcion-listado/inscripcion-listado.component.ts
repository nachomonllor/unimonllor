import { UsuarioTablaComponent } from '../../users/usuario-tabla/usuario-tabla.component';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
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
  @Input() courses: Course[];
  course: Course;
  students: User[] = [];
  @Output() courseSelected =  new EventEmitter<User>();
  @Output() userSelected =  new EventEmitter<User>();
  @ViewChild(UsuarioTablaComponent, { static: true }) usuarioTabla: UsuarioTablaComponent;
  showStudent: boolean;
  constructor(private inscriptionService: InscriptionService) {
  }
  ngOnInit(): void {

  }
  onSubmit() {
  }
  handleCourseSelected(evt) {
    this.course = evt;
    this.showStudent = true;
    this.courseSelected.emit(evt);
    this.getStudentsInscripted(evt.uid);
  }
  getStudentsInscripted(courdeId) {
    this.inscriptionService.getStudentsInscripted(courdeId).subscribe((students: User[]) => {
      this.students = students;
    });
  }
  handleUserSelected($event) {
    debugger
    this.userSelected.emit($event);
  }
}
