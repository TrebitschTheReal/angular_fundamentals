import {Component, ViewChild} from '@angular/core';
import {NgForm, NgModelGroup} from "@angular/forms";
import {ResultMessage} from "../../shared/models/result-message-model";
import {AuthStateFacade} from "../../auth/store/auth.facade";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm')
  public loginForm: NgForm | undefined;
  @ViewChild('loginData')
  public loginData: NgModelGroup | undefined;

  public resultMessages: ResultMessage | undefined;

  constructor(
    public authStateFacade: AuthStateFacade,) {
  }

  onSubmit() {
    let user = {
      email: this.loginData?.control.controls.email.value,
      password: this.loginData?.control.controls.password.value
    }

    this.authStateFacade.login(user);
    //this.authService.login(user);
  }
}
