import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.checkLogging(state.url);
  }

  // tslint:disable-next-line: max-line-length
  canLoad(route: import('@angular/router').Route, segments: import('@angular/router').UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const url = '/${route.path}';
    return this.checkLogging(url);
  }
  checkLogging(url: string) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
