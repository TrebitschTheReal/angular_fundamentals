import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../../courses/shared/course.model";
import {authorNameValidationLogic} from "../../../shared/validators/author-name-validation-logic";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  course: Course = new Course();

  courseForm: FormGroup = new FormGroup({
    'courseData': new FormGroup({
      'title': new FormControl(''),
      'desc': new FormControl(''),
      'newAuthor': new FormControl(''),
      'authors': new FormArray([]),
    })
  })

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCourse();
  }

  onSubmit() {
    console.log(this.courseForm);
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
        'title': new FormControl(null, Validators.required),
        'desc': new FormControl(null, Validators.required),
        'duration': new FormControl(null, [
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

  private initCourse() {
    // if we reached this page with an id:
    // this.course = service.getCourseById(id)
  }
}
