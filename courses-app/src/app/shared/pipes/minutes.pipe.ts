import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
  transform(n: number): string {
    let hours = (n / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);

    return isNaN(rminutes) || isNaN(rhours) ? '00 : 00 hours' :
      ((hours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? '0' + rminutes : rminutes) + " hours");
  }
}
