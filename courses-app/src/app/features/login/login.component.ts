import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModelGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  public loginForm: NgForm | undefined;

  @ViewChild('loginData')
  public loginData: NgModelGroup | undefined;

  constructor() {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log('Form submitted: ', this.loginForm)
    console.log('Email errors: ', this.loginData?.control.controls)
  }

}
