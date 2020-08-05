import { environment } from './../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../models/user.model';
import { UserService } from '../user.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-usuario-tabla',
  templateUrl: './usuario-tabla.component.html',
  styleUrls: ['./usuario-tabla.component.scss']
})
export class UsuarioTablaComponent implements OnInit, OnChanges {
  @Output() userEdited = new EventEmitter<User>();
  @Output() userSelected = new EventEmitter<User>();
  @Input() users;
  @Input() role;
  showAddRemove = false;
  selectedRowIndex: any;
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
    public authService: AuthService,
    private userService: UserService,

  ) {
    if (this.router.url !== '/users/list') {
      this.showAddRemove = true;
    }
    // this.url = `${environment.apiUrl}/api/user`;

  }
  ngOnInit() {
    if (!this.users) {
      this.userService.getUsers(this.role).then((users: User[]) => {
        this.dataSource = new MatTableDataSource<User>(users);
      });
    } else {
      this.dataSource = new MatTableDataSource<User>(this.users);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.users && changes.users.currentValue) {
      this.dataSource = new MatTableDataSource<User>(this.users);
    }
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
        this.userService.remove(id).then(resp => {
           Swal.fire(
              'Atención :)',
              'El usuario ha sido eliminado',
              'success',
            );
          this.ngOnInit();
        }).catch((err) => {
              Swal.fire({
                title: 'Error',
                text: err.error.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                animation: false,
              });
            });
        // this._httpService.delete<User>(`${this.url}/${id}`).subscribe(
        //   () => {
        //     Swal.fire(
        //       'Atención :)',
        //       'El usuario ha sido eliminado',
        //       'success',
        //     );
        //     this.ngOnInit();
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

  onAddStudent(row) {
    row.selected = !row.selected;
    if(row.selected) {
      this.userSelected.emit(row);
    } else {
      this.userSelected.emit(null);
    }
  }
  deselectAll() {
    this.dataSource.data.forEach(u => u.selected = false);
  }
}
