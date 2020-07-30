import { AuthService } from '../../../auth/auth.service';
import { Injectable, IterableDiffers } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Course } from '../../../models/course.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  cupos = 0;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private authService: AuthService
  ) { }
  saveInscription(inscription: any) {

    if (this.validarCupos(inscription.course)) {
      inscription.course.capacity -= 1;
      this.afs.collection('courses').doc(inscription.course.uid).set(inscription.course);

      return this.afs.collection('inscriptions').doc(inscription.course.uid).collection('items').add(inscription.student);
    } else {
      Swal.fire({
        title: 'Atención',
        text: 'No hay cupos para la materia',
        icon: 'error',
        showConfirmButton: true,
        timer: 2000,
        animation: true,
      });
    }
  }
  getStudentsInscripted(courseId) {
    return this.afs
      .collection('inscriptions')
      .doc(courseId)
      .collection('items')
      .snapshotChanges()
      .pipe(
        map((docData: any) => {
          return docData.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as User;
          });
        })
      );
  }
  validarCupos(course: any) {
    if (course.capacity > 0) {
      return true;
    } else {
      return false;
    }
  }
}
