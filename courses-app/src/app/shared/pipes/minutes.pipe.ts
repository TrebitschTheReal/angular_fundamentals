import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
  transform(n: number): string {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return (rhours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? '0' + rminutes : rminutes) + " hours";
  }
}
