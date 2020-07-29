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
  joined$: Observable<any>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private authService: AuthService
  ) { }

  getCourses() {
    return new Promise((resolve, reject) => {
      let courseDoc = this.afs.collection('courses');
      this.afs.collection('courses').snapshotChanges().subscribe((querySnapshot) => {
        let courses: Course[] = [];
        querySnapshot.forEach((doc: any) => {
          const data = doc.payload.doc.data();
          courses.push({
            uid: doc.id,
            name: data.name,
            period: data.period,
            capacity: data.capacity,
            year: data.year,
            teacher: data.teacher,
            img: data.img
          });
        });
         resolve(courses);
      });
    })
  }
  saveCourse(course: Course) {
    // return this.afs.collection('courses').doc(course.teacher.uid).collection('items').add({...course});
    return this.afs.collection('courses').add(course);
    // return this.afs.collection(`courses/${course.teacher}`).add({...course});
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
