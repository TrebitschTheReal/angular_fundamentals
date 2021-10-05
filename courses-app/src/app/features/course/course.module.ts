import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseComponent} from './course.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CourseEditComponent} from './course-edit/course-edit.component';


@NgModule({
  declarations: [
    CourseComponent,
    CourseEditComponent
  ],
  exports: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CourseModule {
}

