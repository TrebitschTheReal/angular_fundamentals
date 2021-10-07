import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input()
  public courseElement: Course = new Course();

  constructor() {
  }

  ngOnInit(): void {
  }

}
