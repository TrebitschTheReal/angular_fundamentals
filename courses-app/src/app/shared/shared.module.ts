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
  NotFoundComponent,
  PasswordEyeComponent,
  ResultMessageComponent,
  SearchComponent,
  SpinnerComponent,
  StringJoinerPipe,
  TogglePasswordDirective
} from './';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "../auth/auth.module";
import {ReactiveComponentModule} from "@ngrx/component";

// @TODO: It would be nice to find a solution not to use type 'any' here
const components: any[] = [
  SearchComponent,
  InfoComponent,
  ButtonComponent,
  HeaderComponent,
  ConfirmModalComponent,
  NotFoundComponent,
  ResultMessageComponent,
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
    AuthModule,
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveComponentModule
  ],
  exports: components,
  providers: [],
})
export class SharedModule {
}
