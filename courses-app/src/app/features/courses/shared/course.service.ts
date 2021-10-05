import {Injectable} from '@angular/core';
import {Course} from './course.model';
import {COURSES} from './mock-courses';
import {COURSE_LIST_ACTION_BUTTONS} from "./mock-course-card-action-buttons";


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
