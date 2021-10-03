import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {authorNameValidationLogic} from "../validators/author-name-validation-logic";

@Directive({
  selector: '[appAuthorNameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AuthorNameValidatorDirective,
    multi: true
  }]
})
export class AuthorNameValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return authorNameValidationLogic(control)
  }
}
