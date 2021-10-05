import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {regexRules} from "./regex-rules";

export function authorNameValidationLogic(control: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !regexRules.validAuthorName.test(String(control.value).toLocaleLowerCase()) ?
      {'validAuthorName': 'Please enter a valid author name!'} : null
  }
}
