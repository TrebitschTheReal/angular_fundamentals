import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../courses/shared/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input()
  public courseElement: Course = new Course('John Doe', 'desc', true, ['Someone', 'Another Someone'], '3 hours', '1991');

  constructor() { }

  ngOnInit(): void {
  }

}
