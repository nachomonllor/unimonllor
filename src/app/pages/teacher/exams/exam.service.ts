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
    return this.afs.firestore.collection('exams').add(exam);
  }
  getStudentsByExam(exam: any) {
    debugger
    return this.afs.collection('exams',
            ref => ref.where('dateExam', '==', exam.dateExam)
            .where('course.uid', '==', exam.course.uid)).snapshotChanges().pipe(map(
      querySnapshot => querySnapshot.map(i => i.payload.doc.data())
    ));
  }
}
