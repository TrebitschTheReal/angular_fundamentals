import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SearchComponent, InfoComponent, ButtonComponent, HeaderComponent } from './components/';

// @TODO: It would be nice to find a solution not to use type 'any' here
const components: any[] = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent
]
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: components
})
export class SharedModule { }
