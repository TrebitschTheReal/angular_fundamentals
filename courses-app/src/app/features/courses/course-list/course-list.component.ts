import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICourseCardActionButton} from '../../../shared/models/course-card-action-buttons-model';
import {Course} from '../../../shared/models/course.model';
import {CoursesStoreService} from "../services/courses-store.service";
import {UserStoreService} from "../../../user/user-store.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  isAdmin: boolean = false;

  @Input()
  public courses: Course[] = [];

  @Input()
  public editabe: boolean = false;

  @Output()
  courseCardActionButtonClicked: EventEmitter<{ actionType: string, course: Course }> = new EventEmitter();

  public courseCardActionButtons: ICourseCardActionButton[] = [];

  constructor(private coursesStoreService: CoursesStoreService,
              private userStoreService: UserStoreService) {
  }

  ngOnInit(): void {
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })

    this.coursesStoreService.getCourseCardActionButtons().then((courseCardActionButtons: ICourseCardActionButton[]) => {
      this.courseCardActionButtons = courseCardActionButtons;
    });
  }

  onCourseCardActionButtonClicked(buttonEventType: string, course: Course): void {
    this.courseCardActionButtonClicked.emit({actionType: buttonEventType, course: course})
  }
}
