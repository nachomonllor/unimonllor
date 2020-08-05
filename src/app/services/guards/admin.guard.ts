import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { UrlTree, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, map, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        // verifico que este logueada
        if (!auth) {
          this.router.navigate(['/login']);
        }
        else {
          // verifico que sea administrador
          let users$ = this.afs.collection('users').doc(this.afsAuth.auth.currentUser.uid).valueChanges();
          users$.subscribe((data: User) => {
            if (containsAdminRole(data.role)) {
              return true;
            } else {
              this.authService.logoutUser();
              return false;
            }
          });
        }
      }));
  }
}

function containsAdminRole(role) {
  return role === 'admin' || role === 'superadmin';
}
