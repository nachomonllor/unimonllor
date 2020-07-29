import { environment } from './../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usuario-tabla',
  templateUrl: './usuario-tabla.component.html',
  styleUrls: ['./usuario-tabla.component.scss']
})
export class UsuarioTablaComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'photoUrl',
    'firstname',
    'lastname',
    'email',
    'role',
    'actions',
  ];
  url: string;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService

  ) {
    // this.url = `${environment.apiUrl}/api/user`;
  }

  ngOnInit() {
    this.userService.getUsers().then((users: User[]) => {
      debugger
      this.dataSource = new MatTableDataSource<User>(users);
    })
  }

  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de eliminar un usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // this._httpService.delete<User>(`${this.url}/${id}`).subscribe(
        //   () => {
        //     Swal.fire(
        //       'Atención :)',
        //       'El usuario ha sido eliminado',
        //       'success',
        //     );
        //     this.ngOnInit();
        //   },
        //   (err) => {
        //     console.log(err);
        //     Swal.fire({
        //       title: 'Error',
        //       text: err.error.message,
        //       icon: 'error',
        //       showConfirmButton: false,
        //       timer: 2000,
        //       animation: false,
        //     });
        //   },
        // );
      }
    });
  }
  onSearchClear() {
    if (this.input.nativeElement.value.length > 0) {
      this.input.nativeElement.value = '';
      this.ngOnInit();
    }
  }
}
