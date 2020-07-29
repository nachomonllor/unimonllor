import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Usuario } from '../clases/usuario';
// import { Profesional } from '../clases/profesional';
// import { Admin } from '../clases/admin';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  token: string;
  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.loadStorage();
  }

  logoutUser() {
    this.user = null;
    this.token = '';
    return this.afAuth.auth.signOut();
  }

  registerUser(user) {
    debugger
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((userData: any) => {
          debugger
          this.sendVerificationMail();
          resolve(userData);
          switch (user.role) {
            case 'admin':
              const adminCollection = this.db.collection('admins');
              adminCollection.doc(userData.user.uid).set({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                photoUrl: user.photoUrl,
                role: user.role,
              });
              break;
            case 'teacher':
              const teacherCollection = this.db.collection('teachers');
              teacherCollection.doc(userData.user.uid).set({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                photoUrl: user.photoUrl,
                role: user.role
              });
              break;
            case 'student':
              const studentCollection = this.db.collection('students');
              console.log(user);
              studentCollection.doc(userData.user.uid).set({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                photoUrl: user.photoUrl,
                role: user.role
              });
              break;
          }
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
          userData.user.getIdToken().then(token => {
            this.user = userData.user;
            this.token = token;
            this.saveStorage(this.token, this.user)
            resolve(userData);
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

  updateDoc(collectionName: string, data: any) {
    const collection = this.db.collection(collectionName);
    switch (collectionName) {
      case 'admins':
        collection.doc(data.email).update({
          email: data.email,
          pass: data.pass,
          perfil: data.perfil,
        });
        break;
      case 'profesionales':
        collection.doc(data.email).update({
          email: data.email,
          pass: data.pass,
          perfil: data.perfil,
          fotoUno: data.fotoUno,
          fotoDos: data.fotoDos,
          firstname: data.firstname,
          atencion: data.atencion,
          lastname: data.lastname,
          especialidades: data.especialidades
        });
        break;
      case 'pacientes':
        collection.doc(data.email).update({
          email: data.email,
          pass: data.pass,
          perfil: data.perfil,
          fotoUno: data.fotoUno,
          firstname: data.firstname,
          lastname: data.lastname,
          fotoDos: data.fotoDos
        });
        break;

    }
  }

  getBD(collection: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).valueChanges().subscribe(data => resolve(data), err => reject(err));
    });
  }

  getBDByDoc(collection: string, nameDoc: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(nameDoc).valueChanges().subscribe(data => resolve(data), err => reject(err));
    });
  }
  saveStorage(token: string, user: firebase.User) {
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
