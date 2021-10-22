import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveComponentModule} from '@ngrx/component';
import {AppRoutingModule} from './app-routing.module';
import {CoursesModule} from './features/courses/courses.module';

import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {WelcomeComponent} from './features/welcome/welcome/welcome.component';
import {AuthorizedGuard} from "./auth/guards/authorized.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthTokenInterceptor} from "./auth/auth-token-interceptor";
import {StoreModule} from "@ngrx/store";

import * as fromApp from './store/app.reducer';
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveComponentModule,
    AppRoutingModule,
    CoursesModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([...fromApp.appEffects])
  ],
  providers: [
    AuthorizedGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
