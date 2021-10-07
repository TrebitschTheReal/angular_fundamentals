import {Component, OnInit} from '@angular/core';
import {Course} from '../models/course.model';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public somethingHappened: boolean = false;

  constructor(private courseService: CourseService, public route: ActivatedRoute) {
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

  onSearchButtonClicked(searchSlug: string) {
    console.log('search button clicked! Filter:', searchSlug)
  }
}
