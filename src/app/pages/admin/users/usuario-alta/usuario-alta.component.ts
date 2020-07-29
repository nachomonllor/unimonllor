import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../models/user.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-usuario-alta',
  templateUrl: './usuario-alta.component.html',
  styleUrls: ['./usuario-alta.component.scss']
})
// Padre de usuarioListadoComponent
export class UsuarioAltaComponent implements OnInit {
  @ViewChild('imageUser') inputImageUser: ElementRef;
  form: FormGroup;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  isRequired = true;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage
  ){
    this.createFormGroup();
  }

  ngOnInit(): void {

  }
  onSubmit() {
    const payload: User = this.form.value;
    payload.photoUrl = this.inputImageUser.nativeElement.value;
    this.authService.registerUser(payload).then(user => {
      this.authService.isAuth().subscribe(user => {
        if (user) {
          user.updateProfile({
            displayName: payload.firstname + ' ' + payload.lastname,
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            Swal.fire({
              title: 'Atención',
              text: 'El usuario ha sido guardado',
              icon: 'success',
              showConfirmButton: true,
              timer: 2000,
              animation: true,
            });
            this.router.navigate(['/users/list']);
          }).catch((error) => console.log('error', error));
        }
      });
    }).catch(err => {
      Swal.fire(
        'Error',
        `:: ${err}`,
        'error'
      );
    });
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      role:  new FormControl('admin', Validators.required),
    }, { validators: this.comparePasswords('password', 'confirmPassword') });
  }
  comparePasswords(field1: string, field2: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return ( group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if ( pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges()
      .pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

}
