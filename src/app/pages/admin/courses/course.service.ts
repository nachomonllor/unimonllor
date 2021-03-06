import { AuthService } from '../../../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Course } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private authService: AuthService
  ) { }

  getCourses() {
      return this.afs.collection('courses').valueChanges();
  }
  saveCourse(course: Course) {
    // return this.afs.collection('courses').doc(course.teacher.uid).collection('items').add({...course});
    course.uid = this.afs.createId();
    return this.afs.collection('courses').doc(course.uid).set(course);
    // return this.afs.collection(`courses/${course.teacher}`).add({...course});
  }

}
