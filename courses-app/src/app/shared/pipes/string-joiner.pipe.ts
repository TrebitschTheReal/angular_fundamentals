import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringJoiner'
})
export class StringJoinerPipe implements PipeTransform {

  transform(stringArr: String[], separator: string): unknown {
    return stringArr.join(separator)
  }
}
