import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('imageUser') inputImageUser: ElementRef;
  form: FormGroup;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.createFormGroup();
  }
  ngOnInit(): void {
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
  createFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      role: new FormControl('teacher', Validators.required),
    });
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
            this.router.navigate(['/login']);
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
}
