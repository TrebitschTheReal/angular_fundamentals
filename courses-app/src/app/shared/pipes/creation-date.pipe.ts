import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {

  transform(value: Date): unknown {
    return new Date(value).toLocaleString().split(',')[0].split('/').join('.')
  }
}
