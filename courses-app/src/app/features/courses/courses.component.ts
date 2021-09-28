import {Component, OnInit} from '@angular/core';
import {Course} from './shared/course.model';
import {CourseService} from './shared/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public somethingHappened: boolean = false;

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService.getCourses().then((courses: Course[]) => {
      this.courses = courses;
    });
  }

  actionButtonClicked(courseClickEventData: { actionType: string, course: Course }) {
    courseClickEventData.actionType === 'delete' ? this.somethingHappened = true : null;
    console.log(`Report from courses.component: #id ${courseClickEventData.course.id} clicked! Click type: ${courseClickEventData.actionType}`)
  }

  modalClicked(isModalConfirmed: boolean) {
    this.somethingHappened = false;

    if (isModalConfirmed) {
      console.log('starting the operation')
    } else {
      console.log('do nothing')
    }
  }
}
