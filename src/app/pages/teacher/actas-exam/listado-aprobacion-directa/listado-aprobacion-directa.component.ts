import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-listado-aprobacion-directa',
  templateUrl: './listado-aprobacion-directa.component.html',
  styleUrls: ['./listado-aprobacion-directa.component.scss']
})
export class ListadoAprobacionDirectaComponent implements OnInit {
  @Input() students: any[];
  constructor() {

  }

  ngOnInit(): void {
    debugger
    this.students = this.students.filter(el => el.note >= 7);

    debugger
  }
}
