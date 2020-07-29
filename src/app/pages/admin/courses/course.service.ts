import { AuthService } from '../../../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { throwError } from 'rxjs';
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
    return new Promise((resolve, reject) => {
      let courseDoc = this.afs.firestore.collection('courses');
      courseDoc.get().then((querySnapshot) => {
        let courses: Course[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          courses.push({
            uid: doc.id,
            name: data.name,
            period: data.period,
            capacity: data.capacity,
            year: data.year,
            teacher: data.teacher,
          });
        });
        resolve(courses);
      }).catch(err => reject);
    });
  }
  saveCourse(course: Course): Promise<void> {
    return this.afs.collection('courses').doc(this.afs.createId()).set(course);
  }
  getCollection(collection: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection(collection).valueChanges().subscribe(data => resolve(data), err => reject(err));
    });
  }
  getByDocument(collection: string, nameDoc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection(collection).doc(nameDoc).valueChanges().subscribe(data => resolve(data), err => reject(err));
    });
  }
}
