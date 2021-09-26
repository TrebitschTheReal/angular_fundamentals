import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.module';

import { CourseCardComponent } from './course-card/course-card.component';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseCardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CourseModule
  ],
  exports: [
    CoursesComponent,
    CourseListComponent,
    CourseCardComponent
  ]
})
export class CoursesModule { }
