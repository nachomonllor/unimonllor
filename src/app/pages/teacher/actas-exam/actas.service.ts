import { AuthService } from '../../../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { throwError, Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Course } from '../../../models/course.model';
import { async } from '@angular/core/testing';
import { TeacherCourseService } from '../my-courses/teacherCourse.service';

@Injectable({
  providedIn: 'root'
})
export class ActasExamService extends TeacherCourseService {

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public authService: AuthService
  ) {
    super(afAuth, afs, authService);
  }
  getExams(courseId): Observable<any> {
    return this.afs.collection('exams', ref => ref.where('course.uid', '==', courseId))
      .snapshotChanges().pipe(map(
        querySnapshot => querySnapshot.map(i => i.payload.doc.data())
      ));
  }

}
