import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../../../shared/models/course.model";
import {authorNameValidationLogic} from "../../../shared/validators/author-name-validation-logic";
import {ActivatedRoute, Params} from "@angular/router";
import {CoursesStoreService} from "../../../shared/services/courses/courses-store.service";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  @Input()
  course: Course | undefined;
  isLoading: boolean = false;
  courseForm: FormGroup = new FormGroup({
    'courseData': new FormGroup({
      'title': new FormControl(''),
      'desc': new FormControl(''),
      'newAuthor': new FormControl(''),
      'authors': new FormArray([]),
    })
  })

  constructor(private route: ActivatedRoute, private coursesStoreService: CoursesStoreService) {
  }

  ngOnInit(): void {
    this.initForm();

    this.coursesStoreService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    })

    this.coursesStoreService.course$.subscribe(course => {
      this.course = course;
      this.initForm();
      this.initAuthors();
    })

    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.getCourse(params['id']);
      }
    })
  }

  onSubmit() {
    console.log(this.courseForm);
  }

  initAuthors() {
    this.course?.authors?.forEach(author => {
      const authorControl = new FormControl(author);
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

  private getCourse(courseId: string) {
    this.coursesStoreService.getCourse(courseId)
  }

  private initCourse(courseId: string) {
    // if we reached this page with an id:
    // this.course = service.getCourseById(id)
  }
}
