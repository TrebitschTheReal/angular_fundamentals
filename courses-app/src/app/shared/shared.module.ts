import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {
  AuthorNameValidatorDirective,
  ButtonComponent,
  ConfirmModalComponent,
  CreationDatePipe,
  EmailValidatorDirective,
  ErrorPageComponent,
  HeaderComponent,
  InfoComponent,
  MinutesPipe,
  PasswordEyeComponent,
  SearchComponent,
  SpinnerComponent,
  StringJoinerPipe,
  TogglePasswordDirective
} from './';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";

// @TODO: It would be nice to find a solution not to use type 'any' here
const components: any[] = [
  SearchComponent,
  InfoComponent,
  ButtonComponent,
  HeaderComponent,
  ConfirmModalComponent,
  ErrorPageComponent,
  MinutesPipe,
  CreationDatePipe,
  StringJoinerPipe,
  EmailValidatorDirective,
  AuthorNameValidatorDirective,
  TogglePasswordDirective,
  PasswordEyeComponent,
  SpinnerComponent
]

@NgModule({
  declarations: components,
  imports: [
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  exports: components
})
export class SharedModule {
}
