import { Component, Input, OnInit, Output } from '@angular/core';
import { Course } from '../shared/course.model';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input()
  public courseElement: Course = new Course('John Doe', 'desc', ['Someone', 'Another Someone'], 3232, new Date());

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

}
