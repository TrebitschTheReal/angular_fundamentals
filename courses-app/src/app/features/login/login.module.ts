import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../../app-routing.module";


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AppRoutingModule
    ]
})
export class LoginModule {
}
