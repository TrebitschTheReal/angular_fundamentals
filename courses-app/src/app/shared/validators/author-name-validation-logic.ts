import {AbstractControl, ValidationErrors} from "@angular/forms";
import {regexRules} from "./regex-rules";

export function authorNameValidationLogic(control: AbstractControl): ValidationErrors | null {
  return !regexRules.authorName.test(String(control.value).toLocaleLowerCase()) ? {forbiddenAuthorName: {value: true}} : null;

}
