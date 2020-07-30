import { environment } from './../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class UsuarioTablaComponent implements OnInit, OnChanges {
  @Output() userEdited = new EventEmitter<User>();
  @Output() userSelected = new EventEmitter<User>();
  @Input() users;
  @Input() role;
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
    private userService: UserService

  ) {
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
  onEdit(evt) {
    this.userEdited.emit(evt);
  }
  onAddStudent(row) {
    row.selected = !row.selected;
    this.userSelected.emit(row);
  }
  deselectAll() {
    this.dataSource.data.forEach(u => u.selected = false);
  }
}
