import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  public loginForm: NgForm | undefined;

  constructor() {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log('Form submitted: ', this.loginForm)
    console.log('Email errors: ', this.loginForm?.form.controls.email.errors)
    console.log('Password errors: ', this.loginForm?.form.controls.password.errors)
  }

}
