import {Component, OnInit} from '@angular/core';
import {Course} from '../../shared/models/course.model';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesStoreService} from "./services/courses-store.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public somethingHappened: boolean = false;
  public isLoading = false;

  constructor(public route: ActivatedRoute, private router: Router,
              public coursesStoreService: CoursesStoreService) {
  }

  ngOnInit(): void {
    this.coursesStoreService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    })

    this.coursesStoreService.courses$.subscribe((courses: Course[]) => {
      this.courses = courses
    })
  }

  actionButtonClicked(courseClickEventData: { actionType: string, course: Course }) {
    courseClickEventData.actionType === 'delete' ? this.somethingHappened = true : null;
    console.log(`Report from courses.component: #id ${courseClickEventData.course.id} clicked! Click type: ${courseClickEventData.actionType}`)
    this.navigateMe(courseClickEventData);
  }

  navigateMe(courseClickEventData: { actionType: string, course: Course }) {
    this.router.navigate([courseClickEventData.actionType + '/' + courseClickEventData.course.id], {relativeTo: this.route});
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
