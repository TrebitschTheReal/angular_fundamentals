import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../shared/models/course.model';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesStoreService} from "./services/courses-store.service";
import {AuthService} from "../../auth/services/auth.service";
import {UserStoreService} from "../../user/user-store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];
  public modalShow: boolean = false;
  public isLoading: boolean = false;
  public isAuthorized: boolean = false;
  public isAdmin: boolean = false;

  private isAuthorizedSubscription: Subscription | undefined;
  private isAdminSubscription: Subscription | undefined;
  private isLoadingSubscription: Subscription | undefined;
  private coursesSubscription: Subscription | undefined;
  private clickedCourseId: string = '';

  constructor(public route: ActivatedRoute,
              private router: Router,
              private coursesStoreService: CoursesStoreService,
              private userStoreService: UserStoreService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthorizedSubscription = this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    })

    this.isAdminSubscription = this.userStoreService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    })

    this.isLoadingSubscription = this.coursesStoreService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    })

    this.coursesSubscription = this.coursesStoreService.courses$.subscribe((courses: Course[]) => {
      this.courses = courses
    })
  }

  actionButtonClicked(courseClickEventData: { actionType: string, course: Course }) {
    console.log(`Report from courses.component: #id ${courseClickEventData.course.id} clicked! Click type: ${courseClickEventData.actionType}`)

    if (courseClickEventData.actionType === 'delete') {
      this.clickedCourseId = courseClickEventData.course.id;
      this.modalShow = true
    } else {
      this.navigateMe(courseClickEventData);
    }
  }

  navigateMe(courseClickEventData: { actionType: string, course: Course }) {
    this.router.navigate(['courses' + '/' + courseClickEventData.actionType + '/' + courseClickEventData.course.id]);
  }

  modalClicked(isModalConfirmed: boolean) {
    this.modalShow = false;

    if (isModalConfirmed) {
      this.coursesStoreService.deleteCourse(this.clickedCourseId);
    } else {
      console.log('do nothing')
    }
  }

  onSearchButtonClicked(searchSlug: string) {
    console.log('search button clicked! Filter:', searchSlug)
  }

  ngOnDestroy() {
    this.coursesSubscription?.unsubscribe()
    this.isAdminSubscription?.unsubscribe()
    this.isAuthorizedSubscription?.unsubscribe()
    this.isLoadingSubscription?.unsubscribe()
  }
}
