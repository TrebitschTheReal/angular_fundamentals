import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from "../../shared/models/course.model";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  public course: Course = new Course();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // unsubscribe from every single subscription in this component
    // (just to make sure)
  }
}
