import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {
  constructor() {
  }

  transform(value: Date): unknown {
    return value.toLocaleString().split(',')[0].split('/').join('.')
  }
}
