import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICourseCardActionButton} from '../shared/course-card-action-buttons-model';
import {Course} from '../shared/course.model';
import {CourseService} from '../shared/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  @Input()
  public courses: Course[] = [];

  @Input()
  public editabe: boolean = false;

  @Output()
  courseCardActionButtonClicked: EventEmitter<{ actionType: string, course: Course }> = new EventEmitter();

  public courseCardActionButtons: ICourseCardActionButton[] = [];

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService.getCourseCardActionButtons().then((courseCardActionButtons: ICourseCardActionButton[]) => {
      this.courseCardActionButtons = courseCardActionButtons;
    });
  }

  onCourseCardActionButtonClicked(buttonEventType: string, course: Course): void {
    this.courseCardActionButtonClicked.emit({actionType: buttonEventType, course: course})
  }
}
