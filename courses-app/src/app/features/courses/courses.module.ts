import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseModule } from '../course-card/course.module';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CourseModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
