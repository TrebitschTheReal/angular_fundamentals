import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup = new FormGroup({
    'courseData': new FormGroup({
      'title': new FormControl(''),
      'desc': new FormControl(''),
      'authorName': new FormControl(''),
      'duration': new FormControl(''),
    })
  })

  constructor() {
  }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      'courseData': new FormGroup({
        'title': new FormControl(null, Validators.required),
        'desc': new FormControl(null, Validators.required),
        'duration': new FormControl(null, [
          Validators.required,
          Validators.minLength(0)]),
      }),
      'newAuthor': new FormGroup({
        'authorName': new FormControl([]),
      })
    })
  }

  onSubmit() {
    console.log(this.courseForm)

  }

}
