import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  @Input()
  public courses: Course[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
