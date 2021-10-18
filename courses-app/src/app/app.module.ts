import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {CoursesModule} from './features/courses/courses.module';

import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {WelcomeComponent} from './features/welcome/welcome/welcome.component';
import {AuthorizedGuard} from "./auth/guards/authorized.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthTokenInterceptor} from "./auth/auth-token-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesModule,
    SharedModule
  ],
  providers: [
    AuthorizedGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
