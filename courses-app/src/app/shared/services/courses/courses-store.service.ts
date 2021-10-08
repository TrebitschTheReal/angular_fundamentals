import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Course} from "../../models/course.model";
import {CoursesService} from "./courses.service";

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService implements OnDestroy {
  public courses$: Observable<Course[]> = new Observable<Course[]>();
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private coursesService: CoursesService) {
    this.getAll();
    this.courses$ = this.courses$$.asObservable();
    this.isLoading$ = this.loading$$.asObservable();
  }

  addcourse() {

  }

  ngOnDestroy() {
    console.log('destroy')
  }

  private getAll(): any {
    this.loading$$.next(true);
    this.coursesService.fetchAll().subscribe({
      next: (courses: Course[]) => {
        console.log(courses)
        this.courses$$.next(courses);
        this.loading$$.next(false);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
