import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { COURSES } from './mock-courses';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getCourses(): Promise<Course[]> {
    return Promise.resolve(COURSES)
  }
}
