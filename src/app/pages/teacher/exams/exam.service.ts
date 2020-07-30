import { AuthService } from '../../../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Usuario } from '../clases/usuario';
// import { Profesional } from '../clases/profesional';
// import { Admin } from '../clases/admin';
import { throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  user: firebase.User;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private authService: AuthService
  ) { }
  saveExam(exam: any) {
    return this.afs.collection('exams').doc(exam.course.uid).collection(exam.student.id).add(exam);
  }
}
