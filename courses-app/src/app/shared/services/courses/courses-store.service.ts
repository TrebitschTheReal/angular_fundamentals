import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Course} from "../../models/course.model";
import {CoursesService} from "./courses.service";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService implements OnDestroy {
  private readonly _courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public readonly courses$: Observable<Course[]> = this._courses$$.asObservable().pipe(shareReplay(1))
  private readonly _loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._loading$$.asObservable().pipe(shareReplay(1))

  constructor(private coursesService: CoursesService) {
    this.getAllCourses();
  }

  get courses(): Course[] {
    return this._courses$$.getValue();
  }

  set courses(course: Course[]) {
    this._courses$$.next(course);
  }

  addCourse(course: Course) {
    this.courses = [
      ...this.courses,
      course
    ];
  }

  ngOnDestroy() {
    console.log('destroy')
  }

  private getAllCourses(): any {
    this._loading$$.next(true);
    this.coursesService.fetchAll().subscribe({
      next: (courses: Course[]) => {
        console.log('Courses arrived to store: ', courses)
        this._courses$$.next(courses);
        this._loading$$.next(false);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
