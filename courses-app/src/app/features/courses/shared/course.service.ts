import {Injectable} from '@angular/core';
import {Course} from './course.model';
import {COURSE_LIST_ACTION_BUTTONS, COURSES} from './mock-courses';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() {
  }

  getCourses(): Promise<Course[]> {
    return Promise.resolve(COURSES)
  }

  getCourseCardActionButtons() {
    return Promise.resolve(COURSE_LIST_ACTION_BUTTONS)
  }
}
