import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from 'src/app/shared/shared.module';
import {CourseModule} from '../course/course.module';

import {CourseCardComponent} from './course-card/course-card.component';
import {CoursesComponent} from './courses.component';
import {CourseListComponent} from './course-list/course-list.component';
import {LoginModule} from "../login/login.module";
import {RegistrationModule} from "../registration/registration.module";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveComponentModule} from "@ngrx/component";


@NgModule({
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseCardComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    CommonModule,
    CourseModule,
    LoginModule,
    RegistrationModule,
    ReactiveComponentModule
  ],
  exports: [
    CoursesComponent,
    CourseListComponent,
    CourseCardComponent
  ]
})
export class CoursesModule {
}
