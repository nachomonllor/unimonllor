import { environment } from '../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
})
export class UsuarioListadoComponent implements OnInit {
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
