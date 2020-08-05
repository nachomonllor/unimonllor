import { AuthService } from './../../../auth/auth.service';
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
export class UserService {
  user: firebase.User;
  users: Map<string, Observable<User>>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private authService: AuthService
  ) { }
  getUsers(role?: string) {
    return new Promise((resolve, reject) => {
      let userDoc;
      if (!role) {
        userDoc = this.afs.firestore.collection('users');
      } else {
        userDoc = this.afs.firestore.collection('users').where('role', '==', role);
      }
      userDoc.get().then((querySnapshot) => {
        let users: User[] = [];
        let i = 1;
        querySnapshot.forEach(doc => {
          const data = doc.data();
          users.push({
            selected: false,
            uid: doc.id,
            firstname: data.firstname,
            lastname: data.lastname,
            role: data.role,
            photoUrl: data.photoUrl,
            email: data.email
          });
          i++;
        });
        resolve(users);
      }).catch(err => reject);
    });
  }
  getUser(uid: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection('users')
        .doc(uid)
        .valueChanges()
        .subscribe(data => resolve(data), err => reject(err));
    });
  }
  updateUser(uid: string, payload) {
    if (!payload.password) {
      delete payload.password;
      delete payload.confirmPassword;
    }
    return this.afs.collection('users')
      .doc(uid).update(payload);
  }
  remove(uid) {
    return this.afs.collection('users')
      .doc(uid).delete();
  }
}
