import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from "../../shared/models/course.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  course: Course | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      console.log(routeParams.id)
      // this.course = need to fetch it from server using an observable
      // this.course = xyservice.fetchCourse(routeParams.id)
      // observable.pipe().subscribe........
    })
  }

  ngOnDestroy() {
    // unsubscribe from every single subscription in this component
    // (just to make sure)
  }
}
