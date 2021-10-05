import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
  transform(n: number): string {
    let limit = 200;
    let hours = (n / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);

    if ((isNaN(rminutes) || isNaN(rhours)) || ((rminutes < 0) || (rhours < 0))) {
      return '00 : 00 hours'
    }

    if (hours > limit) {
      return '200 : 00 hours'
    }

    return ((hours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? '0' + rminutes : rminutes) + " hours");
  }
}
