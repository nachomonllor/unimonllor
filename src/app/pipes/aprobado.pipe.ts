import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'aprobado'
})
export class AprobadoPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1 && value <= 4) {
      return 'desaprobado';
    } else if (value >= 5 && value <= 6) {
      return 'aprobado';
    } else if (value >= 7) {
      return 'promocionado';
    }
  }
}
