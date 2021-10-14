import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../../../shared/models/course.model";
import {authorNameValidationLogic} from "../../../shared/validators/author-name-validation-logic";
import {ActivatedRoute, Params} from "@angular/router";
import {CoursesStoreService} from "../../courses/services/courses-store.service";
import {Subscription} from "rxjs";
import {Author} from "../../../shared/models/author.model";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  @Input()
  course: Course = new Course();
  isLoading: boolean = false;
  courseForm: FormGroup = new FormGroup({
    'courseData': new FormGroup({
      'title': new FormControl(''),
      'desc': new FormControl(''),
      'newAuthor': new FormControl(''),
      'authors': new FormArray([]),
    })
  })
  private isLoadingSubscription: Subscription | undefined;
  private coursesSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private coursesStoreService: CoursesStoreService) {
  }

  ngOnInit(): void {
    this.isLoadingSubscription = this.coursesStoreService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    })

    this.coursesSubscription = this.coursesStoreService.course$.subscribe(course => {
      this.course = course;
      this.initForm();
      this.initAuthors();
    })

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.getCourse(params['id']);
    })
  }

  onSubmit() {
    let newAuthors: Author[] = this.prepareCourse();
    this.coursesStoreService.manageCourse(this.course, newAuthors)
  }

  initAuthors() {
    this.course?.authors?.forEach(author => {
      const authorControl = new FormControl(author.name);
      (<FormArray>this.courseForm.get('courseData.authors')).push(authorControl);
    })
  }

  addAuthor(): void {
    const author = new FormControl(this.courseForm.get('courseData.newAuthor')?.value);
    (<FormArray>this.courseForm.get('courseData.authors')).push(author);
    this.courseForm.get('courseData.newAuthor')?.reset()
  }

  getMyFormArrayControls() {
    return (<FormArray>this.courseForm.get('courseData.authors')).controls;
  }

  getAuthorByIndex(authorIndex: number): FormControl {
    return <FormControl>(<FormArray>this.courseForm.get('courseData.authors')).controls[authorIndex]
  }

  removeAuthor(authorIndex: number) {
    (<FormArray>this.courseForm.get('courseData.authors')).removeAt(authorIndex)
  }

  ngOnDestroy(): void {
    this.coursesSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.isLoadingSubscription?.unsubscribe();
  }

  private initForm() {
    this.courseForm = new FormGroup({
      'courseData': new FormGroup({
        'title': new FormControl(this.course?.title, Validators.required),
        'desc': new FormControl(this.course?.description, Validators.required),
        'duration': new FormControl(this.course?.duration, [
          Validators.required,
          Validators.min(1),
          Validators.max(12000)]),
        'newAuthor': new FormControl('', [
          Validators.maxLength(35),
          authorNameValidationLogic(this.courseForm)
        ]),
        'authors': new FormArray([]),
      }),
    })
  }

  private prepareCourse(): Author[] {
    this.course.title = this.courseForm.get('courseData.title')?.value;
    this.course.description = this.courseForm.get('courseData.desc')?.value;
    this.course.duration = this.courseForm.get('courseData.duration')?.value;

    let currentAuthors = [...this.courseForm.get('courseData.authors')?.value];
    this.course.authors = this.course.authors ?
      this.course.authors.filter(e => currentAuthors.includes(e.name)) : [];
    let newAuthors = currentAuthors.filter(e => !this.course.authors.map(e => e.name).includes(e))

    return newAuthors.map(e => new Author(undefined, e))
  }

  private getCourse(courseId: string) {
    this.coursesStoreService.getCourse(courseId)
  }
}
