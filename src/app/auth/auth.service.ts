import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Usuario } from '../clases/usuario';
// import { Profesional } from '../clases/profesional';
// import { Admin } from '../clases/admin';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  role: string;
  token: string;
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore) {
      this.loadStorage();
  }

  logoutUser() {
    this.loadStorage
    this.user = null;
    this.token = '';
    this.role = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    return this.afAuth.auth.signOut();
  }

  registerUser(user) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((userData: any) => {
          this.sendVerificationMail();
          resolve(userData);
          const userCollection = this.afs.collection('users');
          userCollection.doc(userData.user.uid).set({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            photoUrl: user.photoUrl,
            role: user.role,
          });
        }, err => reject(err));
    });
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
   // Send email verfificaiton when new user sign up
   sendVerificationMail() {
    this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      // this.router.navigate(['verify-email-address']);
    });
  }
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => {
          // Recupero token
          userData.user.getIdToken().then(async(token) => {
            this.token = token;
            // tengo la info del usuario logueado actual
            const userDoc = await firebase.firestore().collection('users').doc(userData.user.uid);
            userDoc.get().then((doc) => {
              const data = doc.data();
              this.user = new User({
                uid: userData.user.uid,
                firstname: data.firstname,
                lastname: data.lastname,
                role: data.role,
                photoUrl: data.photoUrl,
                email: data.email,
              });
              delete this.user.password;
              this.saveStorage(this.token, this.user);
              resolve(userData);
            });
          });
        }, err => reject(err)).catch(e => reject(e));
    });
  }
  sendVerificationEmail() {
    const currentUser = this.afAuth.auth.currentUser;
    currentUser.sendEmailVerification();
  }

  obtenerUsuario(): any {
    return this.afAuth.auth.currentUser;
  }

  isEmailVerified() {
    const user = this.obtenerUsuario();
    return user.emailVerified;
  }


  getBD(collection: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection(collection).valueChanges().subscribe(data => resolve(data), err => reject(err));
    });
  }

  getBafsyDoc(collection: string, nameDoc: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection(collection).doc(nameDoc).valueChanges().subscribe(data => resolve(data), err => reject(err));
    });
  }
  saveStorage(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }
  isLoggedIn(): boolean {
    const isLogged = this.token.length > 5;
    if (!isLogged)  {
      return false;
    } else {
      return true;
    }
  }
  private loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;

    }
  }
}
