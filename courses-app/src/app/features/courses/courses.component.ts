import { Component, OnInit } from '@angular/core';
import { Course } from './shared/course.model';
import { CourseService } from './shared/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().then((courses: Course[]) => {
      this.courses = courses;
      console.log(this.courses)
    });
  }

  actionButtonClicked(actionType: string) {
    console.log(`Report from courses.component: ${actionType} clicked!`)
  }
}
