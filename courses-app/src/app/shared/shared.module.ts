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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "../auth/auth.module";
import {AuthTokenInterceptor} from "../auth/auth-token-interceptor";
import {AuthorizedGuard} from "../auth/guards/authorized.guard";
import {AuthService} from "../auth/services/auth.service";

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
    AuthModule,
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  exports: components,
  providers: [],
})
export class SharedModule {
}
