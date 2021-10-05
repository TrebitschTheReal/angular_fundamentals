import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {regexRules} from "./regex-rules";

export function validEmailValidator(control: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !regexRules.email.test(String(control.value).toLocaleLowerCase()) ?
      {'validEmail': 'Please enter a valid email address!'} : null
  }
}
