import {AbstractControl, ValidationErrors} from "@angular/forms";
import {regexRules} from "./regex-rules";

export function forbiddenEmailValidator(control: AbstractControl): ValidationErrors | null {
  return !regexRules.email.test(String(control.value).toLocaleLowerCase()) ? {forbiddenEmail: {value: true}} : null;

}
