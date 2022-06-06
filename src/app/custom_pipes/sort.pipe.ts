import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs/operators';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    return value.sort((a, b) => {
      let aLC: string = a.name.toLowerCase();
      let bLC: string = b.name.toLowerCase();
      return aLC < bLC ? -1 : (aLC > bLC ? 1 : 0);
  });
  }

}
