import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {ButtonComponent, ConfirmModalComponent, HeaderComponent, InfoComponent, MinutesPipe, SearchComponent} from './';
import {EmailValidatorDirective} from "./directives/email-validator.directive";

// @TODO: It would be nice to find a solution not to use type 'any' here
const components: any[] = [
  SearchComponent,
  InfoComponent,
  ButtonComponent,
  HeaderComponent,
  ConfirmModalComponent,
  MinutesPipe,
  EmailValidatorDirective
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: components
})
export class SharedModule {
}
