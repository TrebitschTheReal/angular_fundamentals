import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {
  AuthorNameValidatorDirective,
  ButtonComponent,
  ConfirmModalComponent,
  CreationDatePipe,
  EmailValidatorDirective,
  HeaderComponent,
  InfoComponent,
  MinutesPipe,
  PasswordEyeComponent,
  SearchComponent,
  StringJoinerPipe,
  TogglePasswordDirective
} from './';
import {FormsModule} from "@angular/forms";

// @TODO: It would be nice to find a solution not to use type 'any' here
const components: any[] = [
  SearchComponent,
  InfoComponent,
  ButtonComponent,
  HeaderComponent,
  ConfirmModalComponent,
  MinutesPipe,
  CreationDatePipe,
  StringJoinerPipe,
  EmailValidatorDirective,
  AuthorNameValidatorDirective,
  TogglePasswordDirective,
  PasswordEyeComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: components
})
export class SharedModule {
}
