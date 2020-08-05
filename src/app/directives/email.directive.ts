import { Directive, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appEmail]',

})
export class EmailDirective {
  constructor(private elementRef: ElementRef, private authService: AuthService) {
    this.elementRef.nativeElement.innerText = authService.user.email;
  }
}
