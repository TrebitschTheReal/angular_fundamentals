import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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
  }

  onSubmit() {

  }

}
