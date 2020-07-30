import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appCupos]',

})
export class CuposDirective  implements OnInit{
  @Input() cupos: number;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    if ( this.cupos > 10 && this.cupos <= 20  ) {
      this.elementRef.nativeElement.style.backgroundColor = 'orange';
      this.elementRef.nativeElement.style.color = 'white';
    }
    if ( this.cupos > 20 ) {
      this.elementRef.nativeElement.style.backgroundColor = 'green';
      this.elementRef.nativeElement.style.color = 'white';
    }
  }

}
