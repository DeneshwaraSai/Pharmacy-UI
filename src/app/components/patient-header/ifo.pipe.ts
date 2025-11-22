import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifo',
  standalone: true
})
export class IfoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
