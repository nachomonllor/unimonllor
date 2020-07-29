import { environment } from '../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../../models/course.model';

@Component({
  selector: 'app-curso-listado',
  templateUrl: './curso-listado.component.html',
  styleUrls: ['./curso-listado.component.scss']
})
export class CursoListadoComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

  }

  onDelete(id) {

  }
}
