import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Course} from "../../../shared/models/course.model";
import {CoursesService} from "./courses.service";
import {COURSE_LIST_ACTION_BUTTONS} from "../../../shared/mock/mock-course-card-action-buttons";
import {AuthorsStoreService} from "../../../shared/services/authors/authors-store.service";
import {AuthorsService} from "../../../shared/services/authors/authors.service";
import {Router} from "@angular/router";
import {ResultMessage} from "../../../shared/models/result-message-model";
import {Author} from "../../../shared/models/author.model";

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService implements OnDestroy {
  private readonly _course$$: BehaviorSubject<Course> = new BehaviorSubject<Course>(new Course());
  public readonly course$: Observable<Course> = this._course$$.asObservable()
  private readonly _courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public readonly courses$: Observable<Course[]> = this._courses$$.asObservable()
  private readonly _loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._loading$$.asObservable()
  private readonly _resultMessage$$: BehaviorSubject<ResultMessage> = new BehaviorSubject<ResultMessage>(new ResultMessage());
  public readonly resultMessage$: Observable<ResultMessage> = this._resultMessage$$.asObservable();

  constructor(private coursesService: CoursesService,
              private authorsService: AuthorsService,
              private router: Router,
              private authorsStoreService: AuthorsStoreService) {
    this.getAllCourses();
  }

  get courses(): Course[] {
    return this._courses$$.getValue();
  }

  set courses(course: Course[]) {
    this._courses$$.next(course);
  }

  getCourse(courseId: string): void {
    this._loading$$.next(true);

    if (courseId) {
      this.coursesService.fetchCourse(courseId).subscribe({
        next: (course: Course) => {
          console.log('Course arrived to store: ', course)
          this._course$$.next(course);
          this._loading$$.next(false);
        },
        error: err => {
          console.log(err)
        }
      })
    } else {
      this._course$$.next(new Course());
      this._loading$$.next(false);
    }
  }

  public manageCourse(course: Course, newAuthors: Author[]) {
    this._loading$$.next(true);
    // Creating an array of observables from the authors we want to create
    // The already existing ones with id, are at the course.authors array
    let authorObservables = newAuthors.map(e => {
      return this.authorsStoreService.createAuthor(e)
    })

    this.coursesService.magicManageCourse(course, authorObservables).subscribe({
      next: (course: Course) => {
        console.log('Course arrived after magic creation: ', course)
        // @TODO
        // need to trigger courses list update somehow
        this.router.navigate([`courses/edit/${course.id}`]);
        this._loading$$.next(false);
      },
      error: (error) => {
        console.log(error.error.errors)
        this._loading$$.next(false);
      }
    })
  }

  deleteCourse(id: string): void {
    this.coursesService.deleteCourse(id).subscribe({
      next: (result: { successful: boolean, result: string }) => {
        console.log(result)
        this.getAllCourses();
      },
      error: err => {
        throw err
      }
    })
  }

  ngOnDestroy() {
    console.log('destroy')
  }

  getCourseCardActionButtons() {
    return Promise.resolve(COURSE_LIST_ACTION_BUTTONS)
  }

  public getAllCourses(): any {
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
